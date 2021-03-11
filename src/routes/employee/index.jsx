
import React, {Component,useEffect,useState} from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import { Link } from 'react-router-dom';
import WithHeader from "../../hoc/WithHeader";
import {Container,Row,Col,CardColumns, } from "reactstrap";
import Accordion from '@material-ui/core/Accordion';
import Routes from '../../constants/routes';
import { Button } from '@material-ui/core';
import axios from 'axios';

import AccordionSummary from '@material-ui/core/AccordionSummary';
import TextField from '@material-ui/core/TextField';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import fakeData from './fakeData.json'
import DeleteIcon from '@material-ui/icons/Delete';

import '../../assets/css/style.css';
import { getDefaultNormalizer, render } from '@testing-library/react';

const URL = 'http://localhost:8080/comp4911-pms-backend/api/employees'

const Employee = () => {

    const [employee, setEmployee] = useState([])

    const [oldPassword, setOldPassword] = useState([])

    const [newPassword, setNewPassword] = useState([])


    useEffect(() =>{
        getData()
    },[])

    const getData = () => {

        setEmployee(fakeData.allEmps);
        // axios.get(URL)
        // .then((res) => {
        //         setEmployee(res.data.data.employees)
        // });
        
    }
    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = employee.filter(employee => id !== employee.id)
            setEmployee(del)
        })
    }

    const changePasswordSubmissionHandler = () =>{
        console.log("heee")
    }
    const addEmployeeSubmissionHandler = () =>{
        <Link to={Routes.ADDEMPLOYEE} />
    }

    const renderEmployee = () => {
        console.log(employee);
        return employee && employee.map((e) => {
        return (
            
                            <Accordion className = 'accbg my-2 mr-2'>
                                <AccordionSummary
                                expandIcon={<EditIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                            
                                <Typography className='employeeAcc ml-4'>{e.fullName}</Typography>
                                       <span className='ml-auto' onClick={() => removeData(e.id)}> <DeleteIcon /></span>
                                </AccordionSummary>
                                <AccordionDetails>
                                <form className=' w-100' onSubmit={changePasswordSubmissionHandler}>
                                                    <div className='py-5 '>
                                                        <TextField onChange={(event) => this.setOldPassword(event.target.value)}
                                                                className='form-control w-50 bg-white'                                                   
                                                                label="Old Password"
                                                                variant="outlined" />
                                                    </div>
                                                    <div className='py-5 justify-content-center'>
                                                        <TextField onChange={(event) => this.setNewPassword(event.target.value)}
                                                                className='form-control w-50 bg-white'
                                                                type='password'                                                               
                                                                label="New Password"
                                                                variant="outlined" />
                                                    </div>
                                                    <Button className='w-50 mt-5 loginbutton'
                                                            onClick={changePasswordSubmissionHandler}
                                                            variant="contained">
                                                        Update Password
                                                    </Button>
                                                </form>
                                </AccordionDetails>
                            </Accordion>

        );
        })
    }

    return (
        <Container>
            <div className='text-right m-3'>
                                                                   
                    <Button className='ml-auto  w-30 mt-5 loginbutton'
                        onClick={addEmployeeSubmissionHandler}
                        variant="contained">
                        Add Employee
                    </Button>
                
            </div>
        
    
        <Container className='p-5 w-200'>
            <div className='mx-auto  employeebox text-center py-5'>
                <div className='employeeRoot'>
                    <Row>
                        <Col xs="6" sm="2" className="font-weight-bold">EMP-NO</Col>
                        <Col xs="6" sm="4" className="font-weight-bold">Username</Col>
                    </Row>
                    
                    <div>{renderEmployee()}</div>
                </div>
            </div>
        </Container>
        </Container>
    )


    // return <div className="Employee">{employee.map(renderEmployee)}</div>


    
}

export default WithSidebar(WithHeader(Employee))
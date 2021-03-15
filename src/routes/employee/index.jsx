
import React, { useEffect, useState } from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import { Link } from 'react-router-dom';
import WithHeader from "../../hoc/WithHeader";
import { Container, Row, Col } from "reactstrap";
import Accordion from '@material-ui/core/Accordion';
import Routes from '../../constants/routes';
import { Button } from '@material-ui/core';
import axios from 'axios';

import AccordionSummary from '@material-ui/core/AccordionSummary';
import TextField from '@material-ui/core/TextField';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import '../../assets/css/style.css';
import { fetchAllEmployees } from '../../api/Employee';

const Employees = () => {

  const [employees, setEmployees] = useState([]);
  // const [oldPassword, setOldPassword] = useState([])
  // const [newPassword, setNewPassword] = useState([])


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data } = await fetchAllEmployees();
    setEmployees(data.employees);

  }
  const removeData = (id) => {

    axios.delete(`${URL}/${id}`).then(res => {
      const del = employees.filter(employees => id !== employees.id)
      setEmployees(del)
    })
  }

  const changePasswordSubmissionHandler = () => {
    console.log("heee")
  }
  const addEmployeeSubmissionHandler = () => {
    <Link to={Routes.ADDEMPLOYEE} />
  }

  const renderEmployees = () => {
    return employees && employees.map((e, index) => {
      return (
        <Row key={index}>
          {
            // The employee data needs to exist inside Cols and not an accordion
            // Please use https://material-ui.com/components/tables/#collapsible-table instead
          }
          <Col xs="6" sm="2" className="font-weight-bold">{e.fullName}</Col>
          <Col xs="6" sm="4" className="font-weight-bold">{e.credential.username}</Col>
          {/* <Accordion className='accbg my-2 mr-2'>
            <AccordionSummary
              expandIcon={<EditIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >

              <Typography className='employeeAcc ml-4'>{e.fullName}</Typography>
              <Typography className='employeeAcc ml-4'>{e.credential.username}</Typography>
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
          </Accordion> */}
        </Row>

      );
    })
  }

  return (
    <Container>
      <div className='text-right m-3'>
        <Button className='ml-auto  w-30 mt-5 loginbutton'
          onClick={addEmployeeSubmissionHandler}
          variant="contained">
          Add employees
        </Button>
      </div>

      <Container className='p-5 w-200'>
        <div className='mx-auto  employeebox text-center py-5'>
          <div className='employeeRoot'>
            <Row>
              <Col xs="6" sm="2" className="font-weight-bold">Full Name</Col>
              <Col xs="6" sm="4" className="font-weight-bold">Username</Col>
            </Row>

            {renderEmployees()}
          </div>
        </div>
      </Container>
    </Container>
  )
};

export default WithSidebar(WithHeader(Employees))
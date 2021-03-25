
import React, { useEffect, useState } from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import { Link } from 'react-router-dom';
import WithHeader from "../../hoc/WithHeader";
import { Container, Row, Col } from "reactstrap";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Routes from '../../constants/routes';
import { Icon } from '@material-ui/core';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ACCESS_TOKEN } from "../../constants/environementVariables"

// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import TextField from '@material-ui/core/TextField';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import '../../assets/css/style.css';
import { fetchAllEmployees } from '../../api/Employee';

const Employees = (props) => {
  
  const [employees, setEmployees] = useState([]);
  const [fullName, setFullName] = useState("");
  const [empId, setEmpId] = useState(0);
  // const [newPassword, setNewPassword] = useState([])


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data } = await fetchAllEmployees();
    setEmployees(data.employees);

  }
  const removeData = (id) => {

    axios.delete(`http://localhost:8080/yojana-backend/api/employees/${id}`,{
      headers:{
        'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`
      }
    }).then(res => {
      const del = employees.filter(employees => id !== employees.id)
      setEmployees(del)
    })
  };

  const onSubmit = () => {
      console.log(empId);
      const data = {
        id: empId ,
        fullName: fullName
      }
      const headers = {
        'Authorization': `${localStorage.getItem(ACCESS_TOKEN)}`,
        'Content-Type': 'application/json'
      }
      console.log(data);
      axios.patch(`http://localhost:8080/yojana-backend/api/employees/${empId}`, 
      
        data, headers
      )
      .then((result) => {
        console.log(result.data);
      })
  }

  // const changePasswordSubmissionHandler = () => {
  //   console.log("heee")
  // };

  const [modal, setModal] = useState(false);
  const toggle = (id) => {
    if (modal == false) {
      setEmpId(id);
      setModal(true);
      return;
    }

    setEmpId(0)
    setModal(false);
  };

  const renderEmployees = () => {
    
      return (

        
       
          <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >Full Name</TableCell>
            <TableCell >User Name</TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((e) => (
            <TableRow key={e.id}>
              <TableCell >{e.id}</TableCell>
              <TableCell >{e.fullName}</TableCell>
              <TableCell >{e.credential?.username}</TableCell>
              <TableCell align="right">
                <span onClick={() => removeData(e.id)}>
                  <DeleteIcon />
                </span>
                <span onClick={() => toggle(e.id)}> 
                  <EditIcon className="ml-4"/>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      );
   
  }

  return (
    <Container>
      <div className='text-right m-3'>
        <Button className='ml-auto  w-30 mt-5 loginbutton'
          variant="contained">
            <Link className="text-white" to={Routes.ADDEMPLOYEE}>Add employees</Link>
        </Button>
      </div>

      <Container className='p-5 w-200'>
        <div className='mx-auto  employeebox text-center py-5'>
          <div className='employeeRoot'>

            {renderEmployees()}
          </div>
        </div>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
      <form onSubmit={onSubmit}>
        <ModalHeader toggle={toggle}>Edit Employee</ModalHeader>
        <ModalBody>
              <div className='mt-5'>
                
                <TextField onChange={(e) => setFullName(e.target.value) } className="bg-white w-100" id="outlined-basic" label="Full Name" variant="outlined" value={fullName} />
              </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </form>  
      </Modal>
    </Container>
  )
};

export default WithSidebar(WithHeader(Employees))
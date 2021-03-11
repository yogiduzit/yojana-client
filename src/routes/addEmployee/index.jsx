
import React, {Component,useEffect,useState} from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import {Container,Row,Col,ButtonGroup,Form } from "reactstrap";
import Accordion from '@material-ui/core/Accordion';
import { Button } from '@material-ui/core'
import axios from 'axios';
import user from '../../assets/images/user.svg'

import AccordionSummary from '@material-ui/core/AccordionSummary';
import TextField from '@material-ui/core/TextField';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import '../../assets/css/style.css';
import { getDefaultNormalizer, render } from '@testing-library/react';

const URL = 'http://localhost:8080/comp4911-pms-backend/api/employees'

class AddEmployee extends Component {
    constructor() {
    super();
    // const [rSelected, setRSelected] = useState(null);
    this.state = {
       fullName: '',
       rSelected: '',
    };
    
    }
 
 onChange = (e) => {
 
    this.setState({ [e.target.name]: e.target.value });
 }
 
 
 onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { fullName} = this.state;
    // const modelId = parseInt(this.props.match.params.id);
 
    axios.post(URL, { fullName })
       .then((result) => {
       //access the results here....
       console.log(result.data);
       });
 }
 render() {
    const { fullName } = this.state;
    return (
        
        <Container className='mx-auto p-5 w-200'>
            <Form onSubmit={this.onSubmit}>
            <div className='mx-auto  employeebox text-center py-2'>
                <div className='mx-2  employeeboxP text-center py-5 '>
                    <div className='employeeRoot px-5 ml-5'>
                    
                        <Row className="mx-2 my-2">
                            <Col xs="8" sm="10" className="font-weight-bold"><img src={user} /></Col>                   
                        </Row>
                        <Row className=" my-3">
                            <Col xs="8" sm="5" className="font-weight-bold">
                                <ButtonGroup>
                                    <Button color="primary" onClick={() => this.setState(1)} active={this.setState === 1}>General</Button>
                                    <Button color="primary" onClick={() => this.setState(2)} active={this.setState === 2}>PM</Button>
                                    <Button color="primary" onClick={() => this.setState(3)} active={this.setState === 3}>HR</Button>
                                    <Button color="primary" onClick={() => this.setState(4)} active={this.setState === 4}>TA</Button>
                                    <Button color="primary" onClick={() => this.setState(5)} active={this.setState === 5}>ADMIN</Button>
                                </ButtonGroup>
                            </Col>                   
                        </Row>
                        <Row>
                            <Col xs="8" sm="5" className="font-weight-bold my-2 ">
                                <TextField className="bg-white w-100" id="outlined-basic" label="EMP 1001" variant="outlined" />
                            </Col>
                            <Col xs="8" sm="5" className="font-weight-bold my-2">
                            <TextField className="bg-white w-100" id="outlined-basic" label="username" variant="outlined" value={fullName} onChange={this.onChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="8" sm="5" className="font-weight-bold my-2">
                            <TextField className="bg-white w-100" id="outlined-basic" label="First Name" variant="outlined" />
                            </Col>
                            <Col xs="8" sm="5" className="font-weight-bold my-2">
                            <TextField className="bg-white w-100" id="outlined-basic" label="Last Name" variant="outlined" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="8" sm="5" className="font-weight-bold my-2">
                            <TextField className="bg-white w-100" id="outlined-basic" label="Manager" variant="outlined" />
                            </Col>
                            <Col xs="8" sm="3" className="font-weight-bold my-2">
                                <p className="my-3">Manager</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="8" sm="5" className="font-weight-bold my-2">
                            <TextField className="bg-white w-100" id="outlined-basic" label="Timesheet Approver" variant="outlined" />
                            </Col>
                            <Col xs="8" sm="3" className="font-weight-bold my-2">
                                <p className="my-3">T.A</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="8" sm="10" className="font-weight-bold my-2">
                                <Button className='ml-auto  w-30 mt-5 loginbutton'
                                    onClick={this.onSubmit}
                                    variant="contained">
                                    Add Employee
                                </Button>
                            </Col>                   
                        </Row>
                    
                    
                    </div>
                </div>
            </div>
            </Form>
        </Container>
        
    )


    // return <div className="Employee">{employee.map(renderEmployee)}</div>


    
}
}

export default WithSidebar(WithHeader(AddEmployee))
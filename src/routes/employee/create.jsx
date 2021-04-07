
import React, { Component } from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import { Container, Row, Col, ButtonGroup, Form } from "reactstrap";
import { Button } from '@material-ui/core'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import user from '../../assets/images/user.svg'

import TextField from '@material-ui/core/TextField';

import '../../assets/css/style.css';
import { createEmployee } from '../../api/Employee';
import { withRouter } from 'react-router';
import Routes from '../../constants/routes';
import { createCredential } from '../../api/Credential';

const roles = ['PM', 'HR', 'Admin'];
class AddEmployee extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      paygrade: '',
      role: '',
      managerId: '',
      Admin: false,
      HR: false,
      PM: false
    };

  }

  onChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }
  onChangeCB = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.checked });
  }
  onSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName, 
      lastName,
      password, 
      username,
      paygrade,
      managerId,
      timesheetApproverId,
      Admin,
      HR,
      PM
    } = this.state;

    const empResponse = await createEmployee({
      fullName: firstName.concat(' ', lastName),
      labourGradeId: paygrade,
      managerId: managerId,
      timesheetApproverId: timesheetApproverId,
      admin: Admin,
      hr: HR,
      projectManager: PM
    });

    if (empResponse.errors.length === 0) {
      const credResponse = await createCredential({
        username,
        password,
        empID: empResponse.data.id
      });
      if (credResponse.errors.length === 0) {
        this.props.history.push(Routes.EMPLOYEE);
      }
    }
  }

  render() {
    return (
      <Container className='mx-auto p-5 w-200'>
        <Form onSubmit={this.onSubmit}>
          <div className='mx-auto  employeebox text-center py-2'>
            <div className='mx-2  employeeboxP text-center py-5 '>
              <div className='employeeRoot px-5 ml-5'>

                <Row className="mx-2 my-2">
                  <Col xs="8" sm="10" className="font-weight-bold"><img src={user} alt="Profile" /></Col>
                </Row>

                <Row>
                  <Col xs="8" sm="10" className="font-weight-bold my-2">
                    {roles.map((role) =>
                          <FormControlLabel
                            control={<Checkbox 
                              onChange={this.onChangeCB} 
                              name={role} />} 
                            label={role}
                          />
                          
                        )}
                  </Col>
                  
                </Row>
                <Row>
                  <Col xs="8" sm="5" className="font-weight-bold my-2 ">
                    <TextField className="bg-white w-100" id="outlined-basic" label="EMP 1001" variant="outlined" />
                  </Col>
                  <Col xs="8" sm="5" className="font-weight-bold my-2">
                    <TextField className="bg-white w-100" id="outlined-basic" label="Username" name="username" variant="outlined" value={this.state.username} onChange={this.onChange} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="8" sm="5" className="font-weight-bold my-2">
                    <TextField className="bg-white w-100" id="outlined-basic" label="First Name" name="firstName" variant="outlined" value={this.state.firstName} onChange={this.onChange} />
                  </Col>
                  <Col xs="8" sm="5" className="font-weight-bold my-2">
                    <TextField className="bg-white w-100" id="outlined-basic" label="Last Name" name="lastName" variant="outlined" value={this.state.lastName} onChange={this.onChange}/>
                  </Col>
                </Row>
                <Row>
                  <Col xs="8" sm="5" className="font-weight-bold my-2">
                    <TextField className="bg-white w-100" id="outlined-basic" label="Manager" name="managerId" variant="outlined" value={this.state.managerId} onChange={this.onChange}/>
                  </Col>
                  <Col xs="8" sm="5" className="font-weight-bold my-2">
                    <TextField className="bg-white w-100" id="outlined-basic" label="Password" name="password" variant="outlined" type="password" value={this.state.password} onChange={this.onChange}/>
                  </Col>
                </Row>
                <Row>
                  <Col xs="8" sm="5" className="font-weight-bold my-2">
                    <TextField className="bg-white w-100" id="outlined-basic" label="Timesheet Approver" name="timesheetApproverId" variant="outlined" value={this.state.timesheetApproverId} onChange={this.onChange}/>
                  </Col>
                  <Col xs="8" sm="5" className="font-weight-bold my-2">
                    <TextField className="bg-white w-100" id="outlined-basic" label="Labour Grade" name="paygrade" variant="outlined" value={this.state.paygrade} onChange={this.onChange}/>
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
  }
}

export default WithSidebar(WithHeader(withRouter(AddEmployee)));

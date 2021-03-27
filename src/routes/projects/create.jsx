
import React, { Component } from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import { Container, Row, Col, Form } from "reactstrap";
import { Button, TextareaAutosize } from '@material-ui/core'

import TextField from '@material-ui/core/TextField';

import '../../assets/css/style.css';
import { withRouter } from 'react-router';
import Routes from '../../constants/routes';
import { createProject } from '../../api/Project';

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      description: ''
    };
  }

  onChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const {
      description,
      id,
      name,
    } = this.state;

    const projectResponse = await createProject({
      id,
      name,
      description,
      status: 'pending'
    });

    if (projectResponse.errors.length === 0) {
      this.props.history.push(Routes.PROJECTS);
    }
  }
  render() {
    return (
      <Container className='mx-auto p-5 w-200'>
        <Form onSubmit={this.onSubmit}>
          <div className='mx-auto  employeebox text-center py-2'>
            <div className='mx-2  employeeboxP text-center py-5 '>
              <div className='employeeRoot px-5 ml-5'>
                <Row>
                  <Col xs="8" sm="5" className="font-weight-bold my-2 ">
                    <TextField className="bg-white w-100" id="outlined-basic" label="PM121" name="id" variant="outlined" value={this.state.id} onChange={this.onChange} />
                  </Col>
                  <Col xs="8" sm="5" className="font-weight-bold my-2">
                    <TextField className="bg-white w-100" id="outlined-basic" label="Project Name" name="name" variant="outlined" value={this.state.name} onChange={this.onChange} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="8" sm="10" className="font-weight-bold my-2">
                    <TextareaAutosize
                      className="bg-white w-100"
                      id="outlined-basic"
                      placeholder="Project Description"
                      rowsMax={10}
                      rowsMin={2}
                      name="description"
                      variant="outlined"
                      value={this.state.description}
                      onChange={this.onChange} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="8" sm="10" className="font-weight-bold my-2">
                    <Button className='ml-auto  w-30 mt-5 loginbutton'
                      onClick={this.onSubmit}
                      variant="contained">
                      Add Project
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

export default WithSidebar(WithHeader(withRouter(AddProject)));

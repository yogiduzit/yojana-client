
import React, { Component } from 'react';
import { useHistory, useParams, withRouter } from 'react-router';
import { Container, Row, Col, Form } from "reactstrap";
import { Button, TextareaAutosize } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import WithSidebar from "../../hoc/WithSidebar";
import WithHeader from "../../hoc/WithHeader";
import Routes from '../../constants/routes';

import '../../assets/css/style.css';
import { fetchProject } from '../../api/Project';

class ViewProject extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      project: {
        id: '',
        name: '',
        description: ''
      }
    };
  }

  componentDidMount = async () => {
    await this.loadProject();
  }

  loadProject = async () => {
    try {
      this.setState({ ...this.state, isFetching: true });
      const res = await fetchProject(this.props.match.params.id);
      this.setState({ isFetching: false, project: res.data.project });
    } catch (e) {
      console.log(e);
      this.setState({...this.state, isFetching: false});
    }
  }

  onChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  onSubmit = async (e) => {
    // e.preventDefault();
  }

  render() {
    return (
      <Container className='mx-auto p-5 w-200' >
        <Form onSubmit={this.onSubmit}>
          <div className='mx-auto  employeebox text-center py-2'>
            <div className='mx-2  employeeboxP text-center py-5 '>
              <div className='employeeRoot px-5 ml-5'>
                <Row>
                  <Col xs="8" sm="5" className="font-weight-bold my-2 ">
                    <TextField className="bg-white w-100" id="outlined-basic" label="PM121" name="id" variant="outlined" value={this.state.project.id} onChange={this.onChange} />
                  </Col>
                  <Col xs="8" sm="5" className="font-weight-bold my-2">
                    <TextField className="bg-white w-100" id="outlined-basic" label="Project Name" name="name" variant="outlined" value={this.state.project.name} onChange={this.onChange} />
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
                      value={this.state.project.description}
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

    );
  }
};

export default WithSidebar(WithHeader(withRouter(ViewProject)));

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../assets/css/style.css'

import React, { Component } from 'react'
import { Container } from 'reactstrap'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'

import logo from '../../assets/images/logo.svg'
import { isLoggedIn, login } from '../../api/Authentication'

import { ACCESS_TOKEN, ROLES } from '../../constants/environementVariables'
import Routes from '../../constants/routes'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { fetchUser } from '../../actions/auth/fetchUser'


class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      valid: true
    }
  }

  getUsername = () => this.state.username
  getPassword = () => this.state.password
  getValid = () => this.state.valid

  setUsername = username => {
    this.setState({ username: username })
  }
  setPassword = password => {
    this.setState({ password: password })
  }
  setValid = valid => {
    this.setState({ valid: valid })
  }

  onLogin = () => {
    login(this.getUsername(), this.getPassword())
      .then(res => {
        console.log(res);
        if ((res.code != null && res.code == 500) || (res.errors != null && res.errors.length > 0)) {
          this.setValid(false);
          return;
        } else {
          this.setValid(true);
          localStorage.setItem(ACCESS_TOKEN, res.data.token);
          localStorage.setItem(ROLES, res.data.roles);
          // Need to save currently logged in user in redux state too
          this.props.fetchUser(res.data.authEmp)
          this.props.history.push(Routes.DASHBOARD);
        }
      });
  }

  componentDidMount () {
    console.log(this.props)
  }

  render () {
    if (isLoggedIn()) {
      return <Redirect to={Routes.DASHBOARD} />
    }
    return (
      <Container className='mx-auto p-5'>
        <div className='mx-auto loginbox text-center py-5'>
          <img src={logo} alt='app-logo' />
          <form className='p-5 w-100' onSubmit={this.loginSubmissionHandler}>
            <div className='mt-5'>
              <TextField
                onChange={event => this.setUsername(event.target.value)}
                className='form-control w-50'
                id='outlined-basic'
                label='Username'
                variant='outlined'
              />
            </div>
            <div className='mt-5'>
              <TextField
                onChange={event => this.setPassword(event.target.value)}
                className='form-control w-50'
                type='password'
                id='outlined-basic'
                label='Password'
                variant='outlined'
              />
            </div>
            <Button
              className='w-50 mt-5 loginbutton'
              onClick={this.onLogin}
              variant='contained'
            >
              Sign In
            </Button>
          </form>
          <div style={{color: "red"}} hidden={this.getValid()}>Incorrect Login</div>
        </div>
            
      </Container>
      
    )
  }
}

export default connect(null, { fetchUser })(Login)

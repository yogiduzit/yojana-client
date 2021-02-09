import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import logo from '../../assets/images/logo.svg'
import '../../assets/css/style.css'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        }
    }

    setUsername = (username) => {this.setState({username: username})}

    setPassword = (password) => {this.setState({password: password})}
    
    loginSubmissionHandler = () => {
        console.log(this.state.username, this.state.password);
    }




    render() {
        return (
                <Container className='mx-auto p-5'>
                    <div className='mx-auto loginbox text-center py-5'>
                        <img src={logo} />
                        <form className='p-5 w-100' onSubmit={this.loginSubmissionHandler}>
                            <div className='mt-5'>
                                <TextField onChange={(event) => this.setUsername(event.target.value)}
                                           className='form-control w-50'
                                           id="outlined-basic"
                                           label="Username"
                                           variant="outlined" />
                            </div>
                            <div className='mt-5'>
                                <TextField onChange={(event) => this.setPassword(event.target.value)}
                                           className='form-control w-50'
                                           type='password'
                                           id="outlined-basic"
                                           label="Password"
                                           variant="outlined" />
                            </div>
                            <Button className='w-50 mt-5 loginbutton'
                                    onClick={this.loginSubmissionHandler}
                                    variant="contained">
                                Sign In
                            </Button>
                        </form>
                    </div>
                </Container>
        );
    }
}
export default Login;
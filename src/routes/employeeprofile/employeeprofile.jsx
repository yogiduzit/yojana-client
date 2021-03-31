import React, { Component, Fragment } from 'react';

import empPic from '../../assets/images/img_avatar.png'
import WithSidebar from "../../hoc/WithSidebar";

import EmployeeDetails from "./employeeDetails";
import EmployeeUpdateProfile from "./employeeUpdateProfile";
import EmployeeUpdatePwd from "./employeeUpdatePwd";
import Header from "./header";

import '../../assets/css/employeeprofile.css';

function showPage(pageType = "employeeDetails", callback) {
    if (pageType === "employeeDetails") {
        return (
            <Fragment>
                <div className="introduce">Profile</div>
                <EmployeeDetails
                    number={788}
                    headImg={empPic}
                    email='test@gmail.com'
                    records={[{
                        state: 'Sick',
                        time: '12/12/2020'
                    }, {
                        state: 'Off',
                        time: '15/10/2020'
                    }]}
                    progress={.782}
                    text='24 hrs'
                    callback={() => {
                        callback("updateEmployeeProfile");
                    }} />
            </Fragment>
        )
    }
    else if (pageType === "updateEmployeeProfile") {
        return (
            <Fragment>
                <EmployeeUpdateProfile
                    number={788}
                    headImg={empPic}
                    email={'test@gmail.com'}
                    callback={() => {
                        callback("updateEmployeePwd");
                    }}></EmployeeUpdateProfile>
            </Fragment>
        )
    }
    else if (pageType === "updateEmployeePwd") {
        return (
            <Fragment>
                <EmployeeUpdatePwd
                    number={788}
                    headImg={empPic}
                    email={'test@gmail.com'}
                />
            </Fragment>
        )
    }
    return null;
}

class EmployeeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHaveNotice: true,
            headImg: empPic,
            email: 'test@gmail.com',
            pageType: 'employeeDetails'
        }
    }

    render() {
        const { isHaveNotice, headImg, email, index } = this.state;
        return (
            <div className='employee'>
                <Header
                    isHaveNotice={isHaveNotice}
                    headImg={headImg}
                    email={email}
                />
                {showPage(index, ((index) => {
                    this.setState({
                        index
                    })
                }))}
            </div>
        );
    }
}
export default WithSidebar((EmployeeProfile));
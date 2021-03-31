import React from 'react';

import '../../assets/css/employeeprofile.css';

/**
 * 
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
 function EmployeeUpdatePwd({ email, headImg, number }) {
    return (
        <div className='employee-pwd-container'>
            <div className='header'>
                <span>Employee number {number}</span>
                <div className='user'>
                    <div>
                        <img className='head' src={headImg} alt="head"/>
                    </div>
                    <span>{email}</span>
                </div>
            </div>
            <div className='input-area'>
                <div>
                    <input type="password" placeholder='Old Password'/>
                </div>
                <div>
                    <input type="password" placeholder='New Password'/>
                </div>
                <div>
                    <input type="password" placeholder='Confirm Password'/>
                </div>
            </div>
            <div className='update-btn'>Update Password</div>
        </div>
    )
};

export default EmployeeUpdatePwd;
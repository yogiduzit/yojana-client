import React, { Component, Fragment } from 'react';

import { AiFillCamera } from "react-icons/ai";

import '../../assets/css/employeeprofile.css';

/**
 * 
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
 function EmployeeUpdateProfile({ callback, email, headImg, number }) {
    return (
        <div className='employee-profile-container'>
            <div className='header'>
                <span>Employee number {number}</span>
                <div className='user'>
                    <img className='head' src={headImg} alt="head"/>
                    <span>{email}</span>
                    {/*<img className='edit' src={empPic} alt="edit"/>*/}
                    <AiFillCamera className='edit'/>
                </div>
            </div>
            <div className='input-area'>
                <div>
                    <input type="text" placeholder='Username'/>
                </div>
                <div>
                    <input type="e-mail" placeholder='Email address'/>
                </div>
                <div>Update Password ?</div>
            </div>
            <div className='update-btn' onClick={() => {
                callback();
            }}>Update Profile</div>
        </div>
    )
};

export default EmployeeUpdateProfile;
import React, { Component, Fragment } from 'react';
import empPic from '../../assets/images/img_avatar.png'
import WithSidebar from "../../hoc/WithSidebar";
import './employeeprofile.css';
import ArcProgress from 'react-arc-progress';
import { BsBell, BsBrush } from "react-icons/bs";
import { AiFillCamera } from "react-icons/ai";
/**
 * 顶部布局
 * @param isHaveNotice
 * @param headImg
 * @param email
 * @returns {JSX.Element}
 * @constructor
 */
function Header(isHaveNotice, headImg ,email) {
    return (
        <div className="header-container">
            {/*搜索框*/}
            <div className="search">
                <img src={empPic} alt='search'/>
                <input type="text" placeholder='Search...'/>
            </div>
            {/*右侧布局*/}
            <div className="info">
                <div className='bell'>
                    {/*<img src={BsFillBellFill} alt="bell"/>*/}
                    <BsBell/>
                    {isHaveNotice ? <div></div> : null }
                </div>
                <div className='head'>
                    <img src={headImg} alt="user-head"/>
                </div>
                <div className='name'>
                    <span>{email}</span>
                </div>
            </div>
        </div>
    )
}

/**
 * 雇员信息
 * @param number
 * @param headImg
 * @param email
 * @param records
 * @param progress
 * @param text
 * @returns {JSX.Element}
 * @constructor
 */
function Employee(number, headImg, email, records, progress, text, callback) {
    return (
        <div className='employee-info-container'>
            <div className='header'>
                <span>Employee number {number}</span>
                <div className='user'>
                    <img src={headImg} alt="head"/>
                    <span>{email}</span>
                </div>
                <div onClick={() => {
                    callback();
                }}>
                    <BsBrush className='edit-img'/>
                    {/*<img src={empPic} alt="edit"/>*/}
                </div>
            </div>
            <div className='details'>
                <div className='leaves'>
                    <span>Vacation & Sick Leaves</span>
                    <div className='leave-item'>
                        {records.map(({state, time}) => {
                            return (
                                <div key={time}>
                                    <span>{time}</span>
                                    <span>{state}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='working'>
                    <span>Working Hours</span>
                    <div className='details'>
                        <div className='label-info'>
                            <div>
                                <span>Working</span>
                                <span>Hours</span>
                            </div>
                            <div>
                                <span>Off</span>
                            </div>
                        </div>
                        <div>
                            <ArcProgress
                                size={150}
                                progress={progress}
                                text={text}
                                fillColor={'#2ED47A'}
                                emptyColor={'#FFB946'}
                                thickness={6}
                                arcStart={0}
                                arcEnd={360}
                                textStyle={{
                                    size: '35px',
                                    color: '#2ED47A'
                                }}
                            />
                        </div>
                    </div>
                    <div className='extra'>
                        <div>Extra Hours</div>
                        <div>0 hrs</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * 更新profile
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function EmployeeUpdateProfile(props) {
    return (
        <div className='employee-profile-container'>
            <div className='header'>
                <span>Employee number {props.number}</span>
                <div className='user'>
                    <img className='head' src={props.headImg} alt="head"/>
                    <span>{props.email}</span>
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
                props.callback();
            }}>Update Profile</div>
        </div>
    )
}

/**
 * 更新密码
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function EmployeeUpdatePwd(props) {
    return (
        <div className='employee-pwd-container'>
            <div className='header'>
                <span>Employee number {props.number}</span>
                <div className='user'>
                    <div>
                        <img className='head' src={props.headImg} alt="head"/>
                    </div>
                    <span>{props.email}</span>
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
}

function showKind(kind = 1, callback) {
    if (kind == 1) {
        return (
            <Fragment>
                <div className="introduce">Profile</div>
                {Employee(788,empPic, 'test@gmail.com', [{
                    state: 'Sick',
                    time: '12/12/2020'
                }, {
                    state: 'Off',
                    time: '15/10/2020'
                }], .782, '24 hrs', () => {
                    callback(2);
                })}
            </Fragment>
        )
    }
    else if (kind == 2) {
        return (
            <Fragment>
                <EmployeeUpdateProfile number={788} headImg={empPic} email={'test@gmail.com'} callback={() => {
                    callback(3);
                }}></EmployeeUpdateProfile>
            </Fragment>
        )
    }
    else if (kind == 3) {
        return (
            <Fragment>
                <EmployeeUpdatePwd number={788} headImg={empPic} email={'test@gmail.com'}></EmployeeUpdatePwd>
            </Fragment>
        )
    }
    return null;
}

class Employeeprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHaveNotice: true,
            headImg: empPic,
            email: 'test@gmail.com',
            index: 1
        }
    }

    render() {
        let that = this;
        const { isHaveNotice, headImg, email, index} = this.state;
        return (
            <div className='employee'>
                {Header(isHaveNotice, headImg, email)}
                {showKind(index, (index) => {
                    that.setState({
                        index
                    })
                })}
            </div>
        );
    }
}
export default WithSidebar((Employeeprofile));
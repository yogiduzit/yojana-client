import React, { Component, Fragment } from 'react';
import empPic from '../../assets/images/img_avatar.png'
import WithSidebar from "../../hoc/WithSidebar";
import '../../assets/css/employeeprofile.css';
import ArcProgress from 'react-arc-progress';
import { BsBell, BsBrush } from "react-icons/bs";
import { AiFillCamera } from "react-icons/ai";
import axios from "axios";
const BaseApi = "http://localhost:8080/yojana-backend/api/";
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJlbXBsb3llZSI6ImJkbGluayJ9.Ufu3Wyz1W60xwOrLaR3xkVBT1zeod8LoUNZNlKpCE-hZBjQ_P3FCh1s1bZ1bSFb2aryqQPDm9Cz1UHd3-NieXA";

function getHours(time) {
    return axios.get(BaseApi + 'employees/hours/' + time, {
        headers: {'Authorization': 'Bearer ' + token}
    });
}

function getEmployeeprofileInfo(id) {
    return axios.get(BaseApi + 'employees/' + id, {
        headers: {'Authorization': 'Bearer ' + token}
    });
}

let dateFormate = function(time, fmt) {
    let da = new Date(time);
    let o = {
        "M+" : da.getMonth()+1,                 
        "d+" : da.getDate(),                   
        "h+" : da.getHours(),                  
        "m+" : da.getMinutes(),               
        "s+" : da.getSeconds(),                 
        "q+" : Math.floor((da.getMonth()+3)/3), 
        "S" : da.getMilliseconds()             
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (da.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(let k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

function getEmployeeprofileDetail(id) {
   return axios.get(BaseApi + 'leaverequest/emp/' + id, {
        headers: {'Authorization': 'Bearer ' + token}
    });
}

function getEmployeeprofile(id, target) {
    // 获取时间
    let time = "2021-03-10";
    axios.all([getEmployeeprofileInfo(id), getEmployeeprofileDetail(id)], getHours(time)).then(axios.spread(function (info, detail, timeDetail) {
        console.log("===", info, detail)
        let employee = {};
        employee.fullName = '';
        employee.username = '';
        employee.id = 0;
        if (info) {
            console.log('=========+++++', info);
            try {
                const data = info.data.data.employee;
                employee.fullName = data.fullName;
                employee.username = data.credential.username;
                employee.id = data.id;
            } catch (e) {
                console.log('Error parsing employees data');
            }
        }
        if (detail) {
            const data = detail.data.data.leaveRequest;
            employee.records = [];
            for (let i = 0; i < data.length; i++) {
                const { type, startDate, endDate } = data[i];
                employee.records.push({
                    state: type,
                    time: dateFormate(startDate, 'yyyy/MM/dd') + '-' + dateFormate(endDate, 'yyyy/MM/dd')
                });
            }
        }
        if (timeDetail) {
            console.log('返回的时间数据', timeDetail);
        }
        target.setState({
            employeeData: employee
        });
    }))
}

/**
 * @param isHaveNotice
 * @param headImg
 * @param email
 * @returns {JSX.Element}
 * @constructor
 */
function Header(isHaveNotice, headImg ,email) {
    return (
        <div className="header-container">
            <div className="search">
                <img src={empPic} alt='search'/>
                <input type="text" placeholder='Search...'/>
            </div>
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
 * 
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
 * 
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
 * 
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

function showKind(kind = 1, callback, data) {
    if (kind === 1) {
        return (
            <Fragment>
                <div className="introduce">Profile</div>
                {Employee(data.id,empPic, data.username, data.records, .782, '24 hrs', () => {
                    callback(2);
                })}
            </Fragment>
        )
    }
    else if (kind === 2) {
        return (
            <Fragment>
                <EmployeeUpdateProfile number={788} headImg={empPic} email={'test@gmail.com'} callback={() => {
                    callback(3);
                }}/>
            </Fragment>
        )
    }
    else if (kind === 3) {
        return (
            <Fragment>
                <EmployeeUpdatePwd number={788} headImg={empPic} email={'test@gmail.com'}/>
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
            index: 1,
            employeeData: {
                id: 0,  
                username: '', 
                records: []
            },
            employeeUpdataData: {},
            employeeUpdatePwd: {}
        }
    }

    componentDidMount() {
        getEmployeeprofile(1, this);
    }

    render() {
        let that = this;
        const { isHaveNotice, headImg, email, index, employeeData, employeeUpdataData, employeeUpdatePwd} = this.state;
        return (
            <div className='employee'>
                {Header(isHaveNotice, headImg, email)}
                {showKind(index, (index) => {
                    that.setState({
                        index
                    })
                }, function () {
                   if (index === 1) {
                       return employeeData;
                   } else if (index === 2) {
                       return employeeUpdataData;
                   } else {
                       return employeeUpdatePwd;
                   }
                }())}
            </div>
        );
    }
}
export default WithSidebar((Employeeprofile));
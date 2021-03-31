import React from 'react';
import { BsBrush } from "react-icons/bs";
import ArcProgress from 'react-arc-progress';

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
function EmployeeDetails({number, headImg, email, records, progress, text, callback}) {
    return (
        <div className='employee-info-container'>
            <div className='header'>
                <span>Employee number {number}</span>
                <div className='user'>
                    <img src={headImg} alt="head" />
                    <span>{email}</span>
                </div>
                <div onClick={() => {
                    callback();
                }}>
                    <BsBrush className='edit-img' />
                    {/*<img src={empPic} alt="edit"/>*/}
                </div>
            </div>
            <div className='details'>
                <div className='leaves'>
                    <span>Vacation & Sick Leaves</span>
                    <div className='leave-item'>
                        {records.map(({ state, time }) => {
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
};

export default EmployeeDetails;
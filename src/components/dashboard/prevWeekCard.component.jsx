import React from 'react';
import WorkingHourIcon from '../../assets/images/working_hour_head_logo.svg'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Row, Col } from 'reactstrap';
import { Button as MaterialButton } from '@material-ui/core'
import DashboardWorkingHourIcon from '../../assets/images/dashboardWorkingHourCircle.svg';
import DashboardOffHourIcon from '../../assets/images/dashboardOffHourCircle.svg';
import 'react-circular-progressbar/dist/styles.css';

const PreviousWeekCard = (props) => {


    return (
        <div className='bg-white mt-5 p-4 dashboard-card-border-radius' >
            <div className=''>
                <img src={WorkingHourIcon} />
                <span className='ml-3 font-weight-bolder header-text-purple-color'>Working Hours</span>
            </div>
            <Row className='p-5'>
                <Col md={6}>
                    <div className='py-5'>
                        <span className='font-weight-bolder'>
                            <img src={DashboardWorkingHourIcon} />
                            <span className='ml-3 font-size-lg'>
                                Working Hour
                            </span>

                        </span>
                    </div>
                        <span className='font-weight-bolder'>
                            <img src={DashboardOffHourIcon} />
                            <span className='ml-3 font-size-lg'>
                                Off
                            </span>

                        </span>
                </Col>
                <Col md={6}>
                    <div className='p-2'>
                        <CircularProgressbar value={50} maxValue={80} text={`${50} hrs`}
                                             strokeWidth={4}
                                             styles={buildStyles({
                                                 textColor: "#2ED47A",
                                                 pathColor: "#2ED47A",
                                                 trailColor: "#FFB946"
                                             })}/>
                    </div>

                </Col>
            </Row>
            <div className='text-center justify-content-center'>
                <MaterialButton className='primary-blue-border-text-color w-75 rounded-pill'>
                    Open Timesheet
                </MaterialButton>
            </div>
        </div>
    )
}

export default PreviousWeekCard;
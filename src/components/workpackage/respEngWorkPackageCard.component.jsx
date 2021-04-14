import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'reactstrap';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';
import { Button as MaterialButton, IconButton } from '@material-ui/core'
import dropDownIcon from '../../assets/images/dropdown-workpackage-icon.svg';
import { getTimeAgo } from "../../utils/dateFormatter";
import AddNewEstimate from '../estimate/newEstimateTable';
import { fetchAllEstimatesOfType } from "../../api/Estimate";

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Collapse from '@material-ui/core/Collapse';
import { fetchCharges, fetchWeeklyCharges } from "../../api/WorkPackage";

const ExpandIcon = () => {
    return (
        <IconButton className='background-light-blue'>
            <img src={dropDownIcon} />
        </IconButton>
    )
}

const useStyles = makeStyles((theme) => ({
    MuiAccordionroot: {
        "&.MuiAccordion-root:before": {
            backgroundColor: "white"
        }
    }
}));
const WorkpackageCard = ({ wpData }) => {
    const classes = useStyles();

    const [type, setType] = useState("weekly");
    const [estimateView, setEstimateView] = useState(false);
    const toggleEstimate = () => {
        setEstimateView(!estimateView);
    };
    const [detailsExpanded, setDetailsExpanded] = useState(false);
    const [charge, setCharge] = useState(0);
    const [weeklyCharges, setWeeklyCharges] = useState({});

    useEffect(() => {
        async function loadEstimates() {
            const res = await fetchAllEstimatesOfType(wpData.workPackagePk.projectID, wpData.workPackagePk.id, 'planned');
            if (res.errors && res.errors.length > 0) {
                console.error("Cannot load estimates");
            } else {
                setType(res.data.estimates.length > 0 ? 'weekly' : 'planned');
            }
        }
        async function loadCharge() {
            const res = await fetchCharges(wpData.workPackagePk.projectID, wpData.workPackagePk.id);
            if (res.errors && res.errors.length > 0) {
                console.error("Cannot load charges");
            } else {
                setCharge(res.data.charge || 0);
            }
        }
        async function loadWeeklyCharges() {
            const res = await fetchWeeklyCharges(wpData.workPackagePk.projectID, wpData.workPackagePk.id);
            if (res.errors && res.errors.length > 0) {
                console.error("Cannot load weekly charges");
            } else {
                setWeeklyCharges(res.data.weeklyCharges || {});
            }
        }
        loadEstimates();
        loadCharge();
        loadWeeklyCharges();
    }, [wpData.workPackagePk.projectID, wpData.workPackagePk.id])

    return (
        <>
            <Accordion elevation={0} classes={{ root: classes.MuiAccordionroot }} className='mt-3' id='wp-accordion'>
                <AccordionSummary
                    expandIcon={<ExpandIcon />}
                    aria-controls="panel1a-content"
                    className='text-center'
                    id="panel1a-header"
                >
                    <Col>
                        <span className='font-weight-bold'>
                            {wpData.workPackagePk.projectID}
                        </span>
                    </Col >
                    <Col>
                        <span className='font-weight-bold'>
                            {wpData.workPackagePk.id}
                        </span>

                    </Col >
                    <Col>
                        <span className='font-weight-bold'>
                            {getTimeAgo(wpData.audit.createdAt)}
                        </span>
                    </Col>
                    <Col>
                        <span className='font-weight-bold'>
                            {getTimeAgo(wpData.dueAt)}
                        </span>
                    </Col>
                </AccordionSummary >
                <AccordionDetails>
                    <Col>
                        <div className='p-2 text-left'>
                            <div>
                                <span className='font-weight-bold'>
                                    Purpose
                                    </span>
                                <span className='font-weight-bold ml-5'>
                                    {wpData.workPackageName}
                                </span>
                            </div>
                            <div className='mt-3'>
                                <span className='font-weight-bold'>
                                    Description
                                    </span>
                                <span className='font-weight-bold ml-5'>
                                    {wpData.description}
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col className='ml-auto text-right'>
                        <div className='p-2 text-right'>
                            <div className='mt-3'>
                                <span className='font-weight-bold'>
                                    Charge (by hour)
                                    </span>
                                <span className='font-weight-bold text-color-primary-yonder ml-5'>
                                    ${charge.hours || 0}
                                </span>
                            </div>
                            <div className='mt-3'>
                                <span className='font-weight-bold'>
                                    Charge (by dollar)
                                    </span>
                                <span className='font-weight-bold text-color-primary-yonder ml-5'>
                                    ${charge.charges || 0}
                                </span>
                            </div>
                        </div>
                    </Col>
                </AccordionDetails >
                <AccordionDetails>
                    <Col className='text-right'>
                        <div className='text-right'>
                            <MaterialButton variant='contained'
                                onClick={() => setDetailsExpanded(!detailsExpanded)}
                                className='bg-white text-color-primary-yonder border-blue font-weight-bold'>
                                View detailed timeline
                            </MaterialButton>
                        </div>
                    </Col>


                </AccordionDetails>
                <AccordionDetails className=''>
                    <Collapse in={detailsExpanded} timeout="auto" unmountOnExit>
                        <Timeline align='left' className='justify-content-start align-items-start'>
                            {
                                Object.entries(weeklyCharges).map(([week, charge], index) => {
                                    return (
                                        <TimelineItem key={index}>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <p className='font-weight-bold'>Week ending: {week}</p>
                                                <p>Charge by hours: {charge.hours}</p>
                                                <p>Charge by dollars: {charge.charges}</p>
                                            </TimelineContent>
                                        </TimelineItem>
                                    )
                                })
                            }
                        </Timeline>
                        <div className='text-right mt-4'>
                            <MaterialButton
                                variant='outlined'
                                className='mt-4 btn-border-text-blue font-weight-bold p-2'
                                onClick={toggleEstimate}
                            >
                                Add Estimate
                        </MaterialButton>
                        </div>
                        {estimateView ? <AddNewEstimate toggle={toggleEstimate} modal={estimateView} type={type} wpData={wpData} redirect={`/resp-eng`} /> : null}
                    </Collapse>
                </AccordionDetails>
            </Accordion >
        </>
    )
}

export default WorkpackageCard;
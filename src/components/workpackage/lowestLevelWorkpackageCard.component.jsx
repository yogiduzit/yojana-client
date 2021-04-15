import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { Button as MaterialButton, IconButton } from '@material-ui/core'
import dropDownIcon from '../../assets/images/dropdown-workpackage-icon.svg';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import { getTimeAgo } from '../../utils/dateFormatter';
import AddNewEstimate from '../estimate/newEstimateTable';
import { useParams } from 'react-router';
import { fetchAllEstimates } from '../../api/Estimate';


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

const LowestLevelWorkpackageCard = ({ wpData }) => {
    const { id } = useParams();

    const [estimateView, setEstimateView] = useState(false);
    const [detailsExpanded, setDetailsExpanded] = useState(false);
    const [estimates, setEstimates] = useState([]);
    const toggleEstimate = () => {
        setEstimateView(!estimateView);
    };

    const showAddEstimate = estimates.filter((estimate) => estimate.type === "initial").length === 0;
    const getEstimateType = function (estimate) {
        switch (estimate.type) {
            case "initial":
                return "Initial Estimate";
            case "planned":
                return "Engineer Planned";
            case "weekly":
                return "Weekly estimate";
            default:
                throw new Error("Unknown estimate type");
        }
    }

    const classes = useStyles();

    useEffect(() => {
        async function loadEstimates() {
            const res = await fetchAllEstimates(id, wpData.workPackagePk.id);
            if (res.errors && res.errors.length > 0) {
                console.error("Cannot load estimates");
            } else {
                setEstimates(res.data.estimates);
            }
        }
        loadEstimates();
    }, [id, wpData.workPackagePk.id])
    return (
        <Accordion elevation={0} classes={{ root: classes.MuiAccordionroot }} className='mt-3' id='wp-accordion'>
            <AccordionSummary
                expandIcon={<ExpandIcon />}
                aria-controls="panel1a-content"
                className='text-center'
                id="panel1a-header"
            >
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.workPackagePk.id}
                    </span>

                </Col>
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.initialEstimate}
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.allocatedInitialEstimate}
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.budget}
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.allocatedBudget}
                    </span>
                </Col>
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
            </AccordionSummary>
            <AccordionDetails >
                <Col>
                    <div className='p-2 text-left'>
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
            </AccordionDetails>
            <AccordionDetails>
                <Col className='p-0'>
                    <span className='font-weight-bold ml-4'>Assigned Employees</span>
                    <span className='font-weight-bold ml-4'>XVZ, YZX, ZXY</span>
                </Col>
                <Col className='text-right'>
                    <div className='text-right'>
                        <MaterialButton variant='contained'
                            onClick={() => setDetailsExpanded(!detailsExpanded)}
                            className='bg-white text-color-primary-yonder border-blue font-weight-bold'>
                            View detailed estimate
            </MaterialButton>
                    </div>
                </Col>


            </AccordionDetails>
            <AccordionDetails className=''>
                <Collapse in={detailsExpanded} timeout="auto" unmountOnExit>
                    <Timeline align='left' className='justify-content-start align-items-start'>
                        {
                            estimates.map((e, index) => {
                                return (
                                    <TimelineItem key={index}>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <span className='font-weight-bold'>{e.forWeek}</span>
                                        </TimelineContent>
                                        <TimelineContent>
                                            <TableContainer component={Paper} style={{ minWidth: 700 }}>
                                                <p className='font-weight-bold'>Type {getEstimateType(e)}</p>
                                                <Table aria-label="spanning table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                Labor Grade
                                                            </TableCell>
                                                            <TableCell>Hourly Rate</TableCell>
                                                            <TableCell>Number of Emp</TableCell>
                                                            <TableCell>Person Days</TableCell>
                                                            <TableCell>Cost</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            e.rows.map((row, rowIndex) => {
                                                                return (
                                                                    <TableRow key={rowIndex}>
                                                                        <TableCell>
                                                                            {row.paygradeId}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {row.payGrade.chargeRate}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {row.empCount}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {row.empDays}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {row.empCount * row.empDays * 8 * row.payGrade.chargeRate}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </TimelineContent>
                                    </TimelineItem>
                                )
                            })
                        }
                    </Timeline>
                    {
                        showAddEstimate && <div className='text-right mt-4'>
                            <MaterialButton
                                variant='outlined'
                                className='mt-4 btn-border-text-blue font-weight-bold p-2'
                                onClick={toggleEstimate}
                            >
                                Add Estimate
                        </MaterialButton>
                        </div>
                    }
                    {estimateView 
                        ? <AddNewEstimate
                            toggle={toggleEstimate}
                            modal={estimateView}
                            redirect={`/project/${wpData.workPackagePk.projectID}/wp/${wpData.workPackagePk.id}`}
                            type="initial"
                            wpData={wpData}/> 
                        : null
                    }
                </Collapse>
            </AccordionDetails>

        </Accordion>
    )
}

export default LowestLevelWorkpackageCard;
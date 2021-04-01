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

const lowestLevelWorkpackageData = [
  {
    date: '18/01/21',
    data: [
      {
        labourGrade: 'P4',
        hourlyRate: 20,
        numberOfEmps: 2,
        personDays: 4,
        cost: 160
      },
      {
        labourGrade: 'P2',
        hourlyRate: 16,
        numberOfEmps: 3,
        personDays: 3,
        cost: 144
      }
    ]
  },
  {
    date: '18/01/28',
    data: [
      {
        labourGrade: 'P4',
        hourlyRate: 20,
        numberOfEmps: 2,
        personDays: 4,
        cost: 160
      },
      {
        labourGrade: 'P2',
        hourlyRate: 16,
        numberOfEmps: 3,
        personDays: 3,
        cost: 144
      }
    ]
  }
]

const LowestLevelWorkpackageCard = ({ wpData }) => {

  const [estimateView, setEstimateView] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [isEstimatedCostEditMode, setIsEstimatedCostEditMode] = useState(false);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const toggleEstimate = () => {
    setEstimateView(!estimateView);
  };

  const classes = useStyles();
  // const wpData = {
  //     wp: 'WP 1.1.1',
  //     initEstimate: 200,
  //     priority: 'High',
  //     issuedDate: '18/01/21',
  //     dueDate: '18/01/21',
  //     detail: {
  //         purpose: 'More refined user interface',
  //         description: 'Customization user interface',
  //         estimatedCost: 200,
  //         charge: 150
  //     }
  // }
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
        {/* <Col>
						<span className='font-weight-bold ml-3'>
							{wpData.priority}
						</span>
					</Col> */}
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
            {/* <div>
                            <span className='font-weight-bold'>
                                Purpose
                                    </span>
                            <span className='font-weight-bold ml-5'>
                                {wpData.detail.purpose}
                            </span>
                        </div> */}
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
            {/* <div>
                            <span className='font-weight-bold'>
                                Initial Estimate
                                    </span>
                            {
                                isEstimatedCostEditMode ?
                                    <>

                                    </> :
                                    <>
                                    </>
                            }
                            <span className='font-weight-bold text-color-primary-yonder ml-5'>
                                ${wpData.initialEstimate}
                            </span>
                        </div> */}
            <div className='mt-3'>
              <span className='font-weight-bold'>
                Charge
                                    </span>
              <span className='font-weight-bold text-color-primary-yonder ml-5'>
                ${wpData.charged}
              </span>
            </div>

          </div>
        </Col>


        {/*<Col></Col>*/}
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
              lowestLevelWorkpackageData.map((e, index) => {
                return (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <span className='font-weight-bold'>{e.date}</span>
                    </TimelineContent>
                    <TimelineContent>
                      <TableContainer component={Paper} style={{ minWidth: 700 }}>
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
                            <TableRow>
                              <TableCell>Desc</TableCell>
                              <TableCell align="right">Qty.</TableCell>
                              <TableCell align="right">Unit</TableCell>
                              <TableCell align="right">Sum</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              e.data.map((d, index1) => {
                                return (
                                  <TableRow key={index1}>
                                    <TableCell>
                                      {d.labourGrade}
                                    </TableCell>
                                    <TableCell>
                                      {d.hourlyRate}
                                    </TableCell>
                                    <TableCell>
                                      {d.numberOfEmps}
                                    </TableCell>
                                    <TableCell>
                                      {d.personDays}
                                    </TableCell>
                                    <TableCell>
                                      {d.cost}
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
          <div className='text-right mt-4'>
            <MaterialButton
              variant='outlined'
              className='mt-4 btn-border-text-blue font-weight-bold p-2'
              onClick={toggleEstimate}
            >
              Add Estimate
                </MaterialButton>
          </div>
          {estimateView ? <AddNewEstimate toggle={toggleEstimate} modal={estimateView} /> : null}
        </Collapse>
      </AccordionDetails>

    </Accordion>
  )
}

export default LowestLevelWorkpackageCard;
import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'reactstrap';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { Button as MaterialButton, IconButton } from '@material-ui/core'
import dropDownIcon from '../../assets/images/dropdown-workpackage-icon.svg';
import AddNewEstimate from "../estimate/newEstimateTable";
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
const WorkpackageCard = (props) => {
    const classes = useStyles();
    const [estimateView, setEstimateView] = useState(false);
    const [estimatedCost, setEstimatedCost] = useState(0);
    const [isEstimatedCostEditMode, setIsEstimatedCostEditMode] = useState(false);
    const toggleEstimate = () => {
        setEstimateView(!estimateView);
    }

    const wpData = {
        wp: 'WP 1',
        initEstimate: 200,
        priority: 'High',
        issuedDate: '18/01/21',
        dueDate: '18/01/21',
        detail: {
            purpose: 'More refined user interface',
            description: 'Customization user interface',
            estimatedCost: 200,
            charge: 150
        }
    }

    return (
        <>
            <Accordion elevation={0} classes={{ root: classes.MuiAccordionroot}} className='mt-3' id='wp-accordion'>
                <AccordionSummary
                    expandIcon={<ExpandIcon />}
                    aria-controls="panel1a-content"
                    className='text-center'
                    id="panel1a-header"
                >
                        <Col>
                            <span className='font-weight-bold'>
                                {wpData.wp}
                            </span>

                        </Col>
                        <Col>
                            <span className='font-weight-bold'>
                                {wpData.initEstimate}
                            </span>
                        </Col>
                        <Col>
                            <span className='font-weight-bold ml-3'>
                                {wpData.priority}
                            </span>
                        </Col>
                        <Col>
                            <span className='font-weight-bold'>
                                {wpData.issuedDate}
                            </span>
                        </Col>
                        <Col>
                            <span className='font-weight-bold'>
                                {wpData.dueDate}
                            </span>
                        </Col>
                </AccordionSummary>
                <AccordionDetails>
                        <Col>
                            <div className='p-2 text-left'>
                                <div>
                                    <span className='font-weight-bold'>
                                        Purpose
                                    </span>
                                    <span className='font-weight-bold ml-5'>
                                        {wpData.detail.purpose}
                                    </span>
                                </div>
                                <div className='mt-3'>
                                    <span className='font-weight-bold'>
                                        Description
                                    </span>
                                    <span className='font-weight-bold ml-5'>
                                        {wpData.detail.description}
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col className='ml-auto text-right'>
                            <div className='p-2 text-right'>
                                <div>
                                    <span className='font-weight-bold'>
                                        Estimated Cost
                                    </span>
                                    {
                                        isEstimatedCostEditMode ?
                                            <>

                                            </> :
                                            <>
                                            </>
                                    }
                                    <span className='font-weight-bold text-color-primary-yonder ml-5'>
                                        ${wpData.detail.estimatedCost}
                                    </span>
                                </div>
                                <div className='mt-3'>
                                    <span className='font-weight-bold'>
                                        Charge
                                    </span>
                                    <span className='font-weight-bold text-color-primary-yonder ml-5'>
                                        ${wpData.detail.charge}
                                    </span>
                                </div>
                                <div className='text-right mt-4'>
                                    <MaterialButton
                                        variant='outlined'
                                        className='mt-4 btn-border-text-blue font-weight-bold p-2'
                                    >
                                        View sub work packages
                                    </MaterialButton>
                                </div>
                                <div className='text-right mt-4'>
                                    <MaterialButton
                                        variant='outlined'
                                        className='mt-4 btn-border-text-blue font-weight-bold p-2'
                                        onClick={toggleEstimate}
                                    >
                                        Add Estimate
                                    </MaterialButton>
                                </div>
                                {estimateView ? <AddNewEstimate toggle={toggleEstimate} modal={estimateView}/>: null}
                            </div>
                        </Col>
                </AccordionDetails>
            </Accordion>
            {/*<Row>*/}
            {/*    <Col></Col>*/}
            {/*    <Col></Col>*/}
            {/*    <Col></Col>*/}
            {/*</Row>*/}
        </>
    )
}

export default WorkpackageCard;
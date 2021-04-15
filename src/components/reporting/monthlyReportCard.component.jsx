import React from 'react';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { Col } from "reactstrap";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Button as MaterialButton, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dropDownIcon from "../../assets/images/dropdown-workpackage-icon.svg";


const useStyles = makeStyles((theme) => ({
    MuiAccordionroot: {
        "&.MuiAccordion-root:before": {
            backgroundColor: "white"
        }
    }
}));

const ExpandIcon = () => {
    return (
        <IconButton className='background-light-blue'>
            <img src={dropDownIcon} />
        </IconButton>
    )
}

const MonthlyReportCard = ({ wpData }) => {
    const classes = useStyles();

    return (
        <Accordion elevation={0} classes={{ root: classes.MuiAccordionroot }} className='mt-3 shadow-sm' id='wp-accordion'>
            <AccordionSummary
                expandIcon={<ExpandIcon />}
                aria-controls="panel1a-content"
                className='text-center'
                id="panel1a-header"
            >
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.id}
                    </span>
                </Col >
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.initialEstimate}
                    </span>
                </Col >
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.budget}
                    </span>
                </Col >
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.planned}
                    </span>
                </Col >
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.costAtCompletion}
                    </span>
                </Col >
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.charge}
                    </span>
                </Col >
            </AccordionSummary >
            <AccordionDetails>
                <Col>
                </Col>
            </AccordionDetails >
        </Accordion >
    )
}

export default MonthlyReportCard;
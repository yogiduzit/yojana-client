import React from 'react';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import {Col, Row} from "reactstrap";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {Button as MaterialButton, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import dropDownIcon from "../../assets/images/dropdown.svg";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


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

const MonthlyReportCard = (props) => {
    const classes = useStyles();

    return (
        <Accordion elevation={0} classes={{ root: classes.MuiAccordionroot }} className='mt-3 shadow-sm alice-blue' id='wp-accordion'>
            <AccordionSummary
                expandIcon={<ExpandIcon />}
                aria-controls="panel1a-content"
                className='text-center'
                id="panel1a-header"
            >
                <Col>
                    <span className='font-weight-bold'>
                      {props.wpData.id}
                    </span>
                </Col >
                <Col>
                    <span className='font-weight-bold'>
                      {props.wpData.project_budget}
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold'>
                      {props.wpData.init_st}
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold'>
                      {props.wpData.engineer_planned}
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold'>
                      {props.wpData.current_chages}
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold'>
                      {props.wpData.est}
                    </span>
                </Col>
            </AccordionSummary >
            <AccordionDetails>
                <Row>
                <Col>
                    <span className="font-weight-bold">Purpose </span>
                </Col>
                <Col className="mr-2 text-purple-color font-weight-bold">
                   {props.wpData.detail.purpose}
                </Col>
                </Row>
                <Row>
                <Col>
                <span className="font-weight-bold">Description </span>
                </Col>
                <Col className="mr-2 text-purple-color font-weight-bold" >
                {props.wpData.detail.description}
                </Col>
                </Row>
                
            </AccordionDetails >
        </Accordion >
    )
}

export default MonthlyReportCard;

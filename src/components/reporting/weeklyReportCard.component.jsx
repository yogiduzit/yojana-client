import React from 'react';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { Col } from "reactstrap";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Button as MaterialButton, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dropDownIcon from "../../assets/images/dropdown-workpackage-icon.svg";
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

const WeeklyReportCard = ({ wpData }) => {
    const classes = useStyles();
    const hasDetails = wpData.details && Object.keys(wpData.details) > 0;

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
                        {wpData.hours}
                    </span>
                </Col >
                <Col>
                    <span className='font-weight-bold'>
                        {wpData.charge}
                    </span>
                </Col >
            </AccordionSummary >
            <AccordionDetails>
                {hasDetails &&
                    <Col>
                        <TableContainer component={Paper} style={{ minWidth: 700 }}>
                            <Table aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='text-center font-weight-bold'>
                                            Emp #
                                    </TableCell>
                                        <TableCell className='text-center font-weight-bold'>Employee Name</TableCell>
                                        <TableCell className='text-center font-weight-bold'>Charged</TableCell>
                                        <TableCell className='text-center font-weight-bold'>Pay Grade Level</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Object.values(wpData.details).map((e) => {
                                            return (
                                                <TableRow key={e.id}>
                                                    <TableCell className='text-center'>
                                                        {e.empId}
                                                    </TableCell>
                                                    <TableCell className='text-center'>
                                                        {e.empName}
                                                    </TableCell>
                                                    <TableCell className='text-center'>
                                                        {e.charge}
                                                    </TableCell>
                                                    <TableCell className='text-center'>
                                                        {e.payGrade.labourGrade}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Col>
                }
            </AccordionDetails >
        </Accordion >
    )
}

export default WeeklyReportCard;
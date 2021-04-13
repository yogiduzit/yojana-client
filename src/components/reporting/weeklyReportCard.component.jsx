import React from 'react';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import {Col} from "reactstrap";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {Button as MaterialButton, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
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

const WeeklyReportCard = (props) => {
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
                      {props.wpData.id}
                    </span>
                </Col >
                <Col>
                    <span className='font-weight-bold'>
                      {props.wpData.from}
                    </span>
                </Col>
                <Col>
                    <span className='font-weight-bold'>
                      {props.wpData.to}
                    </span>
                </Col>
            </AccordionSummary >
            <AccordionDetails>
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
                                    props.wpData.employees.map((e) => {
                                        return (
                                            <TableRow key={e.id}>
                                                <TableCell className='text-center'>
                                                    {e.id}
                                                </TableCell>
                                                <TableCell className='text-center'>
                                                    {e.name}
                                                </TableCell>
                                                <TableCell className='text-center'>
                                                    {e.charged}
                                                </TableCell>
                                                <TableCell className='text-center'>
                                                    {e.payGradeLevel}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Col>
            </AccordionDetails >
        </Accordion >
    )
}

export default WeeklyReportCard;
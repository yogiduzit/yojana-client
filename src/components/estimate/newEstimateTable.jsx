import React, { useState } from "react";
import {
    Button,
    makeStyles,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core'
import { Button as MaterialButton, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper';
import ClearIcon from "@material-ui/icons/Clear";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function AddNewEstimate(props) {
    // TODO: DELETE DUMMY DATA
    // Dummy labour grades that need to be deleted later
    const dummyLabourGrade = ["P1", "P2", "P3", "P4"];

    // TODO: DELETE DUMMY DATA
    // Dummy estimate data that need to be deleted later
    const dummyEstimate = {
        rows: [
            {
                rowId: 1,
                labourGrade: "",
                hourlyRate: 0,
                numberOfEmp: 0,
                personDays: 0,
                cost: 0
            }
        ]
    }
    const [estimate, setEstimate] = useState(dummyEstimate);
    const [labourGrades, setLabourGrades] = useState(dummyLabourGrade);
    const [totalCost, setTotalCost] = useState(0);

    const closeEstimateTable = () => {
        props.toggle();
    }


    const handleNumberChange = (e, rowToUpdate) => {
        if (e.target.name === "hourlyRate") {
            rowToUpdate.hourlyRate = e.target.value;
        }
        else if (e.target.name === "numberOfEmp") {
            rowToUpdate.numberOfEmp = e.target.value;
        }
        else if (e.target.name === "personDays") {
            rowToUpdate.personDays = e.target.value;
        }
        rowToUpdate.cost = rowToUpdate.hourlyRate * rowToUpdate.numberOfEmp * rowToUpdate.personDays;
        setEstimate({
            ...estimate,
            rows: [...estimate.rows].map(row => {
                if (row.rowId === rowToUpdate.rowId) {
                    return rowToUpdate;
                } else return row;
            })
        })
        setTotalCost(estimate.rows.reduce((a, v) => a = a + v.cost, 0));
    }

    const handleDropdownChange = (e, rowToUpdate) => {
        if (e.target.name === 'labourGrade') {
            rowToUpdate.labourGrade = e.target.value;
        }
        setEstimate({
            ...estimate,
            rows: [...estimate.rows].map(row => {
                if (
                    row.labourGrade === rowToUpdate.labourGrade
                ) {
                    return rowToUpdate;
                } else return row;
            })
        })
    }

    const handleDeleteRow = rowToDelete => {
        console.log(rowToDelete.rowId);
        const updatedRows = [...estimate.rows].filter(
            row =>
                row.rowId !== rowToDelete.rowId
        )

        setEstimate({
            ...estimate,
            rows: updatedRows
        })
    }
    const handleAddRow = () => {
        var index;
        if (estimate.rows.length != 0) {
            index = estimate.rows[estimate.rows.length - 1].rowId + 1;
        }
        else {
            index = 1;
        }
        setEstimate({
            ...estimate,
            rows: [
                ...estimate.rows,
                {
                    rowId: index,
                    labourGrade: "",
                    hourlyRate: 0,
                    numberOfEmp: 0,
                    personDays: 0,
                    cost: 0
                }
            ]
        })
    }

    const submitEstimate = () => {
        console.log(estimate);
    }

    return (
        <div>
            <Modal isOpen={props.modal} toggle={closeEstimateTable}>
                <ModalHeader toggle={closeEstimateTable}>Add New Estimate</ModalHeader>
                <ModalBody>
                    <TableContainer component={Paper}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Labour Grade</TableCell>
                                <TableCell>Hourly Rate</TableCell>
                                <TableCell>Number of Emp</TableCell>
                                <TableCell>Person Days</TableCell>
                                <TableCell>Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {estimate.rows.map(row => (
                                <TableRow
                                    key={`${row.rowId}`}
                                >
                                    <TableCell component="th" scope="row">
                                        <Select
                                            value={row.labourGrade}
                                            name="labourGrade"
                                            onChange={e => handleDropdownChange(e, row)}
                                            displayEmpty
                                            required>
                                            <MenuItem value="">
                                                <em>Labour Grade</em>
                                            </MenuItem>
                                            {labourGrades.length > 0 &&
                                                labourGrades.map(item => (
                                                    <MenuItem value={item} key={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <input
                                            name="hourlyRate"
                                            type="number"
                                            value={row.hourlyRate}
                                            min="0"
                                            onChange={e => handleNumberChange(e, row)}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <input
                                            name="numberOfEmp"
                                            type="number"
                                            value={row.numberOfEmp}
                                            onChange={e => handleNumberChange(e, row)}
                                            min="0"
                                            step="1"
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <input
                                            name="personDays"
                                            type="number"
                                            value={row.personDays}
                                            onChange={e => handleNumberChange(e, row)}
                                            min="0"
                                            step="1"
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.cost}
                                    </TableCell>
                                    <TableCell align="right">
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteRow(row)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={5} />
                                <TableCell align="right">
                                    <MaterialButton
                                        variant="outlined"
                                        className='mt-4 btn-border-text-blue font-weight-bold p-2'
                                        onClick={handleAddRow}
                                    >
                                        Add Row
                            </MaterialButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3} />
                                <TableCell aligh="right">Total</TableCell>
                                <TableCell aligh="right">{totalCost}</TableCell>
                            </TableRow>
                        </TableBody>
                    </TableContainer>
                </ModalBody>
                <ModalFooter>
                    <MaterialButton
                        variant="outlined"
                        className='mt-4 btn-border-text-blue font-weight-bold p-2'
                        onClick={() => closeEstimateTable()}
                    >
                        Cancel
                    </MaterialButton>
                    <MaterialButton
                        variant="outlined"
                        className='mt-4 btn-border-text-blue font-weight-bold p-2'
                        onClick={submitEstimate}
                    >
                        Submit
                    </MaterialButton>
                </ModalFooter>
            </Modal>

        </div>
    )
}
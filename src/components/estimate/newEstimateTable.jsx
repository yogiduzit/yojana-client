import React, { useEffect, useState } from "react";
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
import { fetchAllPaygrades } from "../../api/Paygrade";
import { useHistory, useParams } from "react-router";
import { getLastFridayOf } from "../../utils/dateFormatter";
import { createEstimate, createEstimateRow } from "../../api/Estimate";

export default function AddNewEstimate(props) {
    const { id } = useParams();
    const history = useHistory();

    const dummyEstimate = {
        rows: [
            {
                rowId: 1,
                labourGrade: "",
                hourlyRate: 0,
                empCount: 0,
                empDays: 0,
                cost: 0
            }
        ]
    }
    const [estimate, setEstimate] = useState(dummyEstimate);
    const [payGrades, setPayGrades] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        async function loadPaygrades() {
            const res = await fetchAllPaygrades();
            if (res.errors && res.errors.length > 0) {
                console.error("Cannot load paygrades");
            } else {
                setPayGrades(res.data.paygrades);
            }
        }
        loadPaygrades();
    }, [])
    const closeEstimateTable = () => {
        props.toggle();
    }


    const handleNumberChange = (e, rowToUpdate) => {
        if (e.target.name === "hourlyRate") {
            rowToUpdate.hourlyRate = e.target.value;
        }
        else if (e.target.name === "empCount") {
            rowToUpdate.empCount = e.target.value;
        }
        else if (e.target.name === "empDays") {
            rowToUpdate.empDays = e.target.value;
        }
        rowToUpdate.cost = rowToUpdate.hourlyRate * rowToUpdate.empCount * rowToUpdate.empDays;
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
            rowToUpdate.hourlyRate = payGrades.find(payGrade =>
                payGrade.labourGrade === e.target.value).chargeRate;
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
        if (estimate.rows.length !== 0) {
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
                    empCount: 0,
                    empDays: 0,
                    cost: 0
                }
            ]
        })
    }

    const submitEstimate = async () => {
        const createEstimatePayload = {
            workPackageId: props.wpId,
            projectId: id,
            estimateToComplete: 0,
            forWeek: getLastFridayOf(new Date()),
            type: props.type
        }
        const createEstimateResponse = await createEstimate(createEstimatePayload);
        if (!(createEstimateResponse.errors && createEstimateResponse.errors.length > 0)) {
            const createRowsResponses = await Promise.all(estimate.rows.map(async (row, index) => 
                await createEstimateRow(createEstimateResponse.data.id, {
                    estimateRowPk: {
                        estimateId: createEstimateResponse.data.id,
                        index
                    },
                    paygradeId: row.labourGrade,
                    empDays: row.empDays,
                    empCount: row.empCount
                })
            ));

            if (createRowsResponses.some(res => res.data.errors && res.data.errors.length > 0)) {
                console.error("Error creating rows in the estimate");
            } else {
                history.push(`/project/${id}/wp/${props.wpId}`);
            }
        }
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
                                            {payGrades.length > 0 &&
                                                payGrades.map((item, index) => (
                                                    <MenuItem value={item.labourGrade} key={index}>
                                                        {item.labourGrade}
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
                                            readOnly
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <input
                                            name="empCount"
                                            type="number"
                                            value={row.empCount}
                                            onChange={e => handleNumberChange(e, row)}
                                            min="0"
                                            step="1"
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <input
                                            name="empDays"
                                            type="number"
                                            value={row.empDays}
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
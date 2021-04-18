
import React, { useEffect, useState } from 'react';
import WithSidebar from "../../hoc/WithSidebar";
import { Link } from 'react-router-dom';
import WithHeader from "../../hoc/WithHeader";
import { Container, Row, Col } from "reactstrap";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Routes from '../../constants/routes';
import { Icon } from '@material-ui/core';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { ACCESS_TOKEN, API_URL } from "../../constants/environmentVariables";

// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import TextField from '@material-ui/core/TextField';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import '../../assets/css/style.css';
import { fetchAllEmployees } from '../../api/Employee';

const Employees = (props) => {

    const [employees, setEmployees] = useState([]);
    const [fullName, setFullName] = useState("");
    const [admin, setAdmin] = useState(false);
    const [timesheetApprover, setTimesheetApprover] = useState(false);
    const [projectManager, setProjectManager] = useState(false);
    const [hr, setHr] = useState(false);
    const [empId, setEmpId] = useState(0);
    const [managerId, setManagerId] = useState(0);
    const [labourGradeId, setLabourGradeId] = useState("");
    const [timesheetApproverId, setTimesheetApproverId] = useState(0);

    // const [newPassword, setNewPassword] = useState([])


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const { data } = await fetchAllEmployees();
        setEmployees(data.employees);
        console.log(data.employees);
    }
    const removeData2 = (id) => {
        const headers = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        }
        axios.delete(`${API_URL}/employees/${id}`,
            headers
        ).then(res => {
            const del = employees.filter(employees => id !== employees.id)
            setEmployees(del)
        })
    };

    const onSubmit = () => {
        const data = {
            id: empId,
            fullName: fullName,
            admin: admin,
            isTimesheetApprover: timesheetApprover,
            projectManager: projectManager,
            hr: hr,
            managerId: managerId,
            timesheetApproverId: timesheetApproverId,
            labourGradeId: labourGradeId
        }
        const headers = {
            headers: { 'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`, 'Content-Type': "application/json" }
        }
        console.log(data);
        axios.patch(`${API_URL}/employees/${empId}`,

            data, headers
        )
            .then((result) => {
                console.log(result.data);
                getData();
                toggle();
            })
    }

    // const changePasswordSubmissionHandler = () => {
    //   console.log("heee")
    // };

    const [modal, setModal] = useState(false);
    const toggle = (e) => {
        if (modal == false) {
            setEmpId(e.id);
            setFullName(e.fullName);
            setAdmin(e.admin);
            setTimesheetApproverId(e.timesheetApproverId);
            setProjectManager(e.projectManager);
            setHr(e.hr);
            setManagerId(e.managerId);
            setLabourGradeId(e.labourGradeId);
            setModal(true);
            return;
        }

        setEmpId(0)
        setModal(false);
    };

    const renderEmployees = () => {

        return (



            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell >Full Name</TableCell>
                            <TableCell >User Name</TableCell>
                            <TableCell >Admin</TableCell>
                            <TableCell >Project Manager</TableCell>
                            <TableCell >HR</TableCell>
                            <TableCell >Managed By</TableCell>
                            <TableCell >Created By</TableCell>
                            <TableCell >Timesheet Approved By</TableCell>
                            <TableCell >Labour Grade</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((e) => (
                            <TableRow key={e.id}>
                                <TableCell >{e.id}</TableCell>
                                <TableCell >{e.fullName}</TableCell>
                                <TableCell >{e.credential?.username}</TableCell>
                                <TableCell >{e.admin.toString()}</TableCell>
                                <TableCell >{e.projectManager.toString()}</TableCell>
                                <TableCell >{e.hr.toString()}</TableCell>
                                <TableCell >{e.managerId}</TableCell>
                                <TableCell >{e.creatorId}</TableCell>
                                <TableCell >{e.timesheetApproverId}</TableCell>
                                <TableCell >{e.labourGradeId}</TableCell>
                                <TableCell align="right">
                                    <span onClick={() => removeData2(e.id)}>
                                        <DeleteIcon />
                                    </span>
                                    <span onClick={() => toggle(e)}>
                                        <EditIcon className="ml-4" />
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        );

    }

    return (
        <Container>
            <div className='text-right m-3'>
                <Button className='ml-auto  w-30 mt-5 loginbutton'
                    variant="contained">
                    <Link className="text-white" to={Routes.ADDEMPLOYEE}>Add employees</Link>
                </Button>
            </div>

            <Container className='p-5 w-200'>
                <div className='mx-auto  employeebox text-center py-5'>
                    <div className='employeeRoot'>

                        {renderEmployees()}
                    </div>
                </div>
            </Container>
            <Modal isOpen={modal} toggle={toggle}>
                <form onSubmit={onSubmit}>
                    <ModalHeader toggle={toggle}>Edit Employee</ModalHeader>
                    <ModalBody>
                        <div className='mt-5'>

                            <TextField onChange={(e) => setFullName(e.target.value)} className="bg-white w-100" id="outlined-basic" label="Full Name" variant="outlined" value={fullName} />
                            <label>Privileges:</label><br />
                            <label for="myAdmin">Admin</label>
                            <Checkbox onChange={(e) => setAdmin(e.target.checked)} checked={admin} className="bg-white w-100" id="myAdmin" label="Admin" value={admin} />
                            <label for="myPM">Project Manager</label>
                            <Checkbox onChange={(e) => setProjectManager(e.target.checked)} checked={projectManager} className="bg-white w-100" id="myPM" value={projectManager} />
                            <label for="myHR">HR</label>
                            <Checkbox onChange={(e) => setHr(e.target.checked)} checked={hr} className="bg-white w-100" id="myHR" variant="outlined" value={hr} />
                            <TextField onChange={(e) => setManagerId(e.target.value)} className="bg-white w-100" id="outlined-basic" label="Manager ID" variant="outlined" value={managerId} />
                            <TextField onChange={(e) => setTimesheetApproverId(e.target.value)} className="bg-white w-100" id="outlined-basic" label="Timesheet Approver ID" variant="outlined" value={timesheetApproverId} />
                            <TextField onChange={(e) => setLabourGradeId(e.target.value)} className="bg-white w-100" id="outlined-basic" label="Labour Grade" variant="outlined" value={labourGradeId} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={onSubmit}>Submit</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </Container>
    )
};

export default WithSidebar(WithHeader(Employees))
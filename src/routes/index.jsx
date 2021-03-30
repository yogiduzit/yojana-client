import React from 'react';
import Routes from "../constants/routes";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./login/login";
import Dashboard from './dashboard';

import Projects from './projects';
import AddProject from './projects/create';
import ViewProject from './projects/view';

import Timesheet from './timesheet';
import TimesheetCreate from './timesheet/create'
import TimesheetDetail from './timesheet/detail'
import TimesheetEdit from './timesheet/edit'
import Report from './report';
import Team from './team';
import LeaveRequestCreate from './leaveRequest/create'
import LeaveRequestList from './leaveRequest/list'
import LeaveRequestDetail from './leaveRequest/detail'
import Employee from './employee/index'
import AddEmployee from './employee/create'

import '../assets/css/style.css';
import EmployeeProfile from './employeeprofile/employeeprofile';

const Main = (props) => {
    return (
        <div>
            <BrowserRouter>
                <Route path={Routes.LOGIN} component={Login} />
                <Route exact path={Routes.HOME} component={Dashboard} />
                <Route exact path={Routes.PROJECTS} component={Projects} />
                <Route path={Routes.DASHBOARD} component={Dashboard} />
                <Route path={Routes.TIMESHEET} component={Timesheet} />
                <Route path={Routes.ADDPROJECT} component={AddProject} />
                <Route exact path={Routes.VIEW_PROJECT} component={ViewProject} />
                <Route path={Routes.TIMESHEET_CREATE} component={TimesheetCreate} />
                <Route path={Routes.TIMESHEET_DETAIL} component={TimesheetDetail} />
                <Route path={Routes.TIMESHEET_EDIT} component={TimesheetEdit} />
                <Route path={Routes.REPORT} component={Report} />
                <Route path={Routes.TEAM} component={Team} />
                <Route exact path={Routes.LEAVE_REQUEST_CREATE} component={LeaveRequestCreate} />
                <Route exact path={Routes.LEAVE_REQUEST_LIST} component={LeaveRequestList} />
                <Route path={Routes.LEAVE_REQUEST_DETAIL} component={LeaveRequestDetail} />
                <Route path={Routes.EMPLOYEE} component={Employee} />
                <Route path={Routes.ADDEMPLOYEE} component={AddEmployee} />
                <Route path={Routes.EMPLOYEEPROFILE} component={EmployeeProfile} />
            </BrowserRouter>
        </div>
    )
}

export default Main;
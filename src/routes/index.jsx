import React from 'react';
import Routes from "../constants/routes";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./login/login";
import Dashboard from './dashboard';
import Projects from './projects';
import Timesheet from './timesheet';
import TimesheetCreate from './timesheet/create'
import Report from './report';
import Team from './team';
import '../assets/css/style.css';

const Main = (props) => {
    return (
        <div>
            <BrowserRouter>
                <Route path={Routes.LOGIN} component={Login} />
                {/*<Route exact path={Routes.HOME} component={login} />*/}
                <Route path={Routes.DASHBOARD} component={Dashboard} />
                <Route path={Routes.PROJECTS} component={Projects} />
                <Route path={Routes.TIMESHEET_CREATE} component={TimesheetCreate} />
                <Route path={Routes.TIMESHEET} component={Timesheet} />
                <Route path={Routes.REPORT} component={Report} />
                <Route path={Routes.TEAM} component={Team} />
            </BrowserRouter>
        </div>
    )
}

export default Main;
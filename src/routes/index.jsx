import React from 'react';
import Routes from "../constants/routes";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./login/login";
import Dashboard from './dashboard/index';
import '../assets/css/style.css'

const Main = (props) => {
    return (
        <div>
            <BrowserRouter>
                <Route path={Routes.LOGIN} component={Login} />
                {/*<Route exact path={Routes.HOME} component={Login} />*/}
                <Route path={Routes.DASHBOARD} component={Dashboard} />
            </BrowserRouter>
        </div>
    )
}

export default Main;
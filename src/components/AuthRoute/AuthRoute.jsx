import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isLoggedIn } from '../../api/Authentication'
import Routes from '../../constants/routes'

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLoggedIn() ? <Component {...props} /> : <Redirect to={Routes.LOGIN} />)}
  />
);

export default AuthRoute;
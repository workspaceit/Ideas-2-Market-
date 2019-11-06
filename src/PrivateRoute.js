import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'


const PrivateRoute = ({ component: Component, userInfo, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      userInfo !== null
        ? <Component {...props} />
        : <Redirect to='/login' />
    )}
  />
)

export default withRouter(PrivateRoute)

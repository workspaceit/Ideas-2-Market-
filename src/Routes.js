import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { Loader, Toastify } from './components'
import {
  LoginScreen,
  DashboardScreen,
  MainScreen,
  ThankYouScreen,
} from './screens'


class Routes extends Component {
  render() {
    const { userInfo } = this.props

    return (
      <React.Fragment>
        <Switch>
          <PrivateRoute
            exact
            path='/'
            render={() => <Redirect to='/challenges' />}
            userInfo={userInfo}
          />
          <Route
            path='/login'
            component={LoginScreen} 
          />
          <Route
            path='/session'
            component={MainScreen} 
          />
          <Route
            exact
            path='/thankyou'
            component={ThankYouScreen} 
          />
          <PrivateRoute
            path='/challenges'
            component={DashboardScreen}
            userInfo={userInfo}
          />
          {/* <Route exact path='/challenges' component={ChallengesScreen} />
          <Route path='/challenges/new' component={NewChallengeScreen} /> */}
          <PrivateRoute
            render={() => (<div>Miss</div>)}
            userInfo={userInfo}
          />
        </Switch>
        <Loader loading={this.props.util.loading} />
        <Toastify />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
    util: state.util
  }
}

export default withRouter(connect(mapStateToProps)(Routes))

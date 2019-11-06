import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import {WelcomeScreen, FAQScreen, SessionScreen, SessionEndScreen} from '../'


class MainScreen extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path='/session/:session_id'
            component={WelcomeScreen}
          />
          {/*<Route*/}
            {/*exact*/}
            {/*path='/session/faq'*/}
            {/*component={FAQScreen}*/}
          {/*/>*/}
          <Route
            exact
            path='/session/:session_id/start'
            component={SessionScreen}
          />
          <Route
            exact
            path='/session/:session_id/end'
            component={SessionEndScreen}
          />
          {/* <Route render={() => <Redirect to='/session/welcome' />} /> */}
        </Switch>
      </div>
    )
  }
}

export default withRouter(MainScreen)

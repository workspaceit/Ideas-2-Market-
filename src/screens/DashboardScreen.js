import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import {
  Header
} from '../components'
import {
  ChallengePreviewScreen,
  ChallengesScreen,
  DraftChallengeScreen,
  NewChallengeScreen,
  ChallengeViewScreen,
  ChallengeSessionViewScreen
} from '.'


class DashboardScreen extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path='/challenges'
            component={ChallengesScreen}
          />
          <Route
            path='/challenges/new'
            component={NewChallengeScreen}
          />
          <Route
            path='/challenges/preview'
            component={ChallengePreviewScreen}
          />
          <Route
            path='/challenges/:challengeId/edit'
            component={DraftChallengeScreen}
          />
          <Route
            path='/challenges/:challengeId/preview'
            component={ChallengePreviewScreen}
          />
          <Route
            path='/challenges/:challengeId/view'
            component={ChallengeViewScreen}
          />
          <Route
            path='/challenges/:challengeId/:sessionId'
            component={ChallengeSessionViewScreen}
          />
        </Switch>
        {/* <Footer /> */}
      </div>
    )
  }
}

export default withRouter(DashboardScreen)

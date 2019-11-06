import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { DraftChallengeForm } from '../components'


class DraftChallengeScreen extends Component {

  render() {
    return (
      <React.Fragment>
        <DraftChallengeForm />
      </React.Fragment>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DraftChallengeScreen))

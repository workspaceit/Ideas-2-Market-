import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { submitChallengeRequest } from '../../actions/challenges'
import { i2mLogoWhite } from '../../resources'


class ChallengePreviewNav extends Component {
  onSaveClick = (event) => {
    event.preventDefault()

    const challengeId = this.props.match.params.challengeId
    const { errorMessage } = this.props
    const disabled = errorMessage !== null && errorMessage !== undefined ? true : false
    if (disabled) {
      alert('Cannot submit challenge. Please fill the required fields and try again.')
    } else {
      if (challengeId === undefined) {
        this.props.submitChallengeRequest()
      } else {
        this.props.submitChallengeRequest(true, challengeId)
      }
    }
  }

  render() {
    const challengeId = this.props.match.params.challengeId

    return (
      <div className="tnav violet">
        <div className="row clearfix violet-padding">
          <div className="col-md-3">
            {/* <img src={i2mLogoWhite} /> */}
          </div>
          <div className="col-md-4">
            <p className="sm-txt">Challenge Preview</p>
          </div>
          <div className="col-md-5"> 
            <a href="#" className="tnav-pbtn save" onClick={this.onSaveClick}>Save Challenge</a>
            <Link
              to={`/challenges/${challengeId === undefined ? 'new' : `${challengeId}/edit`}`}
              className="tnav-pbtn"
            >
              Edit Challenge
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.challenges.submit.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ submitChallengeRequest }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengePreviewNav))

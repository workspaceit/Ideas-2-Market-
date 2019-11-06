import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
import { SessionFAQ, SessionIntroduction } from '../../components'
import {bindActionCreators} from "redux";
import { checkValidSession, sessionRequest, sessionStarted } from "../../actions/session"
import { i2mLogoWhite } from '../../resources'


class WelcomeScreen extends Component {
  state = {
    showModal: false
  }

  onModalOpen = (event) => {
    event.preventDefault()

    this.setState({ showModal: true })
  }

  onModalClose = (event) => {
    event.preventDefault()

    this.setState({ showModal: false })
  }

  onStartClick = (event) => {
    event.preventDefault()

    const sessionId = this.props.match.params.session_id
    this.props.sessionStarted(sessionId);
  }

  componentDidMount() {
    const sessionId = this.props.match.params.session_id
    this.props.sessionRequest('welcome', sessionId)
  }

  render() {
    const { showModal } = this.state
    const sessionId = this.props.match.params.session_id

    return (
      <div className="landing">
        {/* { !showModal && */}
        <div className="landing-invert">
          <div className="col-md-8 center-block">
              <p className="logo-invert"><img src={i2mLogoWhite} /></p>
              { showModal &&
                <SessionFAQ onModalClose={this.onModalClose} />
              }
              { !showModal &&
                <SessionIntroduction />
              }
              <div className="btn-area text-center">
                <button onClick={this.onStartClick} className="btn-challange">Ok - Let's start</button>
                <a
                  href="#"
                  type="button"
                  data-toggle="modal"
                  data-target="#faqModal"
                  onClick={this.onModalOpen}
                  style={{marginBottom: '80px'}}
                >
                  FAQ
                </a>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sessions: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ checkValidSession, sessionRequest, sessionStarted }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen))

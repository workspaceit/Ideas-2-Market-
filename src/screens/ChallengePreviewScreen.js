import React, { Component } from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  ChallengePreviewNav, InspirationElement
} from '../components'
import { paddy } from '../utils/time';


class ChallengePreviewScreen extends Component {

  state = {
    inspireMe: false,
    inspireIndex: -1,
    inspirations: [],
  }

  componentWillMount() {
    this.state.inspirations = this.props.match.params.challengeId === undefined ? this.props.formData.inspirations : this.props.singleFormData.inspirations
    window.scrollTo(0, 0);
  }

  inspireMe = () => {
    this.state.inspireMe = true
    this.state.inspireIndex += 1
    const inspireIndex = this.state.inspireIndex < this.state.inspirations.length ? this.state.inspireIndex : 0
    this.setState({ inspireIndex })
  }

  displayInspiration = () => {
    if (this.state.inspirations.length === 0) {
      return null
    }
    if (this.state.inspireMe) {
      return (
        <InspirationElement inspiration={ this.state.inspirations[this.state.inspireIndex] }  />
      )
    } else {
      return (
        <div className="inspire-container">
          <p className="p-first">Click the button above and you will be presented with a set of others ideas.</p>
          <p>Fell Free to use them as inspiration: remix them with your own ideas, expand on them, or use them in any way you'd like!</p>
        </div>
      )
    }
  }

  render() {
    const challengeId = this.props.match.params.challengeId
    let {
      formData,
      errorMessage
    } = this.props
    if (challengeId !== undefined) {
      formData = this.props.singleFormData
    }
    const {
      taskDescription,
      challengeDescription,
      seconds,
      minutes,
      title
    } = formData

    return (
      <div className="container">
        <ChallengePreviewNav />
        <div className="col-md-8 center-block">
          <div className="row clearfix preview-area">
            { errorMessage !== null && errorMessage !== undefined && errorMessage.length > 0 &&
              <p className="small-warning">
                <span>{errorMessage}</span>
              </p>
            }
            <p className="small-warning">
                <span>{taskDescription}</span>
                <span style={{ fontWeight: '500', display: 'block'}}>
                <i className="glyphicon glyphicon-info-sign"></i>
                  &nbsp; If you have any issues with the system, try refreshing the page - it will maintain your ideas and the timer in the same place as before.
                </span>
            </p>
            <h3 className="title">{title}</h3>
            <div className="timer-flick">
              <p className="challange-txt">{challengeDescription.length > 0 ? challengeDescription : '-'}</p>
              <div className="timer-div">{minutes.length > 0 ? paddy(minutes, 2, '0') : '00'}:{seconds.length > 0 ? paddy(seconds, 2, '0') : '00'}</div>
            </div>
            <h3 className="title">Submit a new Idea</h3>
            <textarea className="prev-control"></textarea>
            <div className="btn-container">
              <button className="reset">Reset</button>
              <button className="submit">Submit or Press Enter</button>
            </div>

            {this.displayInspiration()}
            { 
              this.state.inspirations.length > 0  &&
              <div style={{textAlign: 'center'}}>
                <button className="inspire-me-button" onClick={ this.inspireMe } >Inspire me</button>
              </div>
            }

            <h3 className="title">Your Ideas</h3>
            <div className="idea-contain">
              <div className="resrow resrow-border">
                <div className="blank-solid"></div>
              </div>
            </div>
          </div>

          <div className="blank-div"></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    formData: state.challenges.formData,
    singleFormData: state.challenges.single.formData,
    errorMessage: state.challenges.submit.errorMessage
  }
}

export default withRouter(connect(mapStateToProps)(ChallengePreviewScreen))

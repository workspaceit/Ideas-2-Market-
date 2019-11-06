import React, { Component } from "react"
import { Link, Route, withRouter } from "react-router-dom"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import moment from "moment"
import { loadChallengeRequest, exportChallengeIdea } from "../actions/challenges"


class ChallengeViewScreen extends Component {
  state = {
    ideaTabActive: true
  }

  onChangeIdeaTabActivity = (event, activity) => {
    this.setState({ ideaTabActive: activity })
  }

  onExport = (event) => {
    event.preventDefault()
    this.props.exportChallengeIdea()
  }

  goToSessionDetails = (sessionLink) => {
    const sessionEncoded = Buffer.from(sessionLink).toString('base64')
    this.props.history.push(`/challenges/${this.props.match.params.challengeId}/${sessionEncoded}`)
  }

  render() {
    const { originalResponse, ideas, sessions } = this.props.challenge;

    let ideasList = ideas.map((idea, index) => (
      <div className="resrow" key={index}>
        <p>{idea.content}</p>
      </div>
    ))
    let sessionsList = sessions.map((session, index) => {
      const rejected = session.ideas.filter(idea => idea.state === 'rejected').length
      const approved = session.ideas.filter(idea => idea.state === 'approved').length
      let className = "unreviewed"
      let label = "Unreviewed"
      let countLabel = ""
      if (approved > rejected) {
        className = "approved"
        label = "Approved"
        if (approved !== session.ideas.length) {
          countLabel = `${approved}/${session.ideas.length}`
        }
      } else if (approved < rejected) {
        className = "rejected"
        label = "Rejected"
        if (rejected !== session.ideas.length) {
          countLabel = `${rejected}/${session.ideas.length}`
        }
      }
      return (
        <div className="resrow" key={`session${index}`} onClick={() => this.goToSessionDetails(session._links.self.href)}>
          <div className="row clearfix">
            <div className="col-md-7">
              <p className="ideator">{session.ideatorId} — {session.startTime ? moment(session.startTime).format("HH:mm") : '00:00'} - {session.endTime ? moment(session.endTime).format("HH:mm") : '00:00'}</p>
            </div>
            <div className="col-md-2 text-center">
              {session.ideas ? session.ideas.length : 0} Ideas
            </div>
            <div className="col-md-3 text-center">
              <span className={`${className}`}>{label} {countLabel}</span>
            </div>
          </div>
        </div>
      )
    })

    if (ideas.length < 1) {
      ideasList = (
        <div className="resrow">
          <p className="empty-idea">&nbsp;</p>
        </div>
      )
    }
    if (sessions.length < 1) {
      sessionsList = (
        <div className="resrow">
          <p className="empty-idea">&nbsp;</p>
        </div>
      )
    }

    return (
      <div className="container">
        <div className="tnav withMargin">
          <div className="row clearfix">
            <div className="col-md-4">
              <Link to="/challenges">&lt; Dashboard</Link>
            </div>
            <div className="col-md-4"/>
            <div className="col-md-4"/>
          </div>
        </div>

        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 center-block">
              <div className="tabs">
                <h4 className="tab-title">{originalResponse.title}</h4>
                <ul className="nav nav-tabs tabs-cstm" role="tablist">
                  <li role="presentation" className="active">
                    <a href="#idea" aria-controls="idea" role="tab" data-toggle="tab" aria-expanded="true" onClick={(event) => this.onChangeIdeaTabActivity(event, true)}>Ideas / <span>{ideas.length}</span></a>
                  </li>
                  <li role="presentation" className="">
                    <a href="#people" aria-controls="people" role="tab" data-toggle="tab" aria-expanded="false" onClick={(event) => this.onChangeIdeaTabActivity(event, false)}>People / <span>{sessions.length}</span></a>
                  </li>
                  { this.state.ideaTabActive &&
                    <li className="li-export"><button onClick={this.onExport} className="btn-export" disabled={ideas.length < 1}>Export Ideas</button></li>
                  }
                </ul>

                <div className="tab-content tabs-content-cstm">
                  <div role="tabpanel" className="tab-pane active" id="idea">
                    {ideasList}
                    { ideas.length < 1 &&
                      <div className="view-message">Currently, there are no ideas in this challenge.</div>
                    }
                  </div>
                  <div role="tabpanel" className="tab-pane" id="people">
                    {sessionsList}
                    { sessions.length < 1 &&
                      <div className="view-message">Currently, there are no sessions in this challenge.</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    challenge: state.challenges.single
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadChallengeRequest, exportChallengeIdea }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengeViewScreen))

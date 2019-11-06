import React, { Component } from "react"
import { Link, Route, withRouter } from "react-router-dom"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { loadChallengeRequest, approveOrRejectIdeas } from "../actions/challenges"
import moment from "moment"
import apiEndpoint from "../utils/api"
import auth from "../reducers/auth"


class ChallengeSessionViewScreen extends Component {
  state = {
    checkedList: {},
    ideatorInfo: {}
  }

  componentDidMount() {
    let self = this
    const { token, challenge } = this.props
    let { checkedList } = this.state
    const { sessions } = challenge
    const currentSession = sessions.find(session => session._links.self.href === Buffer.from(this.props.match.params.sessionId, 'base64').toString('ascii'))
    currentSession.ideas.forEach(idea => {
      checkedList[idea._links.self.href] = idea.state === "approved" ? true : false;
    })
    apiEndpoint.get(`/api/ideators/${currentSession.ideatorId}`, { headers: { authorization: `Bearer ${token}` } })
      .then(response => {
        self.setState({ ideatorInfo: response.data, checkedList: checkedList })
      })
      .catch(error => console.log(error))
  }

  onCheckboxChange = (event, ideaLink) => {
    let { checkedList } = this.state
    checkedList[ideaLink] = event.target.checked
    this.setState({ checkedList })
  }

  onAcceptOrReject = (event, action, currentSession, selectedCount) => {
    event.preventDefault()
    let self = this
    let checkedList = []
    if (selectedCount < 1) { // all reject/accept
      checkedList = currentSession.ideas.map(idea => idea._links.self.href)
    } else { // selected reject/accept
      checkedList = Object.keys(this.state.checkedList).filter(key => self.state.checkedList[key] === true)
    }
    this.props.approveOrRejectIdeas(action, checkedList)
  }

  getNewRangeValue = (oldMin, oldMax, oldValue) => {
    return (((oldValue - oldMin) * 100) / (oldMax - oldMin))
  }

  getTimelineContent = () => {
    let percentageOccured = []
    const { sessions, originalResponse } = this.props.challenge;
    const currentSession = sessions.find(session => session._links.self.href === Buffer.from(this.props.match.params.sessionId, 'base64').toString('ascii'));
    const events = currentSession.events;
    const totalTimelineTime = originalResponse.config.timePerSessionInMs
    return (
      events.map((item, index) => {
        let percentage = Math.ceil((item.timeInSession * 100) / totalTimelineTime)
        while (percentageOccured.includes(percentage)) {
          percentage += 1
        }
        percentageOccured.push(percentage)
        const className = item.type === 'inspiration-request' ? 'star' : ''
        return <dl className={className} key={index} style={{left: `${percentage}%`}}></dl>
      })
    )
  }

  render() {
    const self = this
    const { originalResponse, ideas, sessions } = this.props.challenge
    const currentSession = sessions.find(session => session._links.self.href === Buffer.from(this.props.match.params.sessionId, 'base64').toString('ascii'))
    const challengeId = this.props.match.params.challengeId
    const startTimeUnix = moment(currentSession.startTime).valueOf()
    const endTimeUnix = (moment(currentSession.startTime).add(originalResponse.config.timePerSessionInMs ? originalResponse.config.timePerSessionInMs + 1 : 0, 'seconds')).valueOf()
    const selectedCount = Object.keys(this.state.checkedList).filter(key => self.state.checkedList[key] === true).length
    const ideasList = currentSession.ideas.map((idea, index) => (
      <div className="resrow" key={index}>
        <p>{idea.content}</p>
        <div className="checkbox">
          <input
            type="checkbox"
            checked={this.state.checkedList[idea._links.self.href] === true}
            onChange={(event) => this.onCheckboxChange(event, idea._links.self.href)}
          />
        </div>
      </div>
    ))
    const { ideatorInfo } = this.state


    return (
      <div className="container">
        <div className="tnav">
          <div className="row clearfix">
            <div className="col-md-4">
              <Link to={`/challenges/${challengeId}/view`}>&lt; Sessions</Link>
            </div>
            <div className="col-md-4" />
            <div className="col-md-4" />
          </div>
        </div>

        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 center-block">
              <div className="tabs">
                <h4 className="tab-title">Submitted Session</h4>
                <div className="user-action">
                  <div className="row clearfix">
                    <div className="col-md-7">
                      <div className="user-action-avatar">
                        <img src={"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzE2LjgyNCAzMTYuODI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMTYuODI0IDMxNi44MjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0yMTMuMzEsMTg1Ljg3N2wtMC44MS0wLjM2NmMtMS45MzQtMC44OC0zLjg4Mi0xLjcxLTUuODY4LTIuNDg3Yy0yLjE2Ni0wLjg2OC00LjM2NC0xLjY3MS02LjU5NC0yLjQyMw0KCQljLTEuNzYxLTAuNTc4LTMuNTM1LTEuMTE4LTUuMzI4LTEuNjQ1Yy0yLjczMS0wLjc5LTUuNDg5LTEuNTA0LTguMzI5LTIuMTM0Yy0wLjk2NC0wLjE5OS0xLjk0Ny0wLjM5Mi0yLjkyNC0wLjU2NmwtMC42NjgtMC4xMjkNCgkJYy0xLjY3Ny0wLjMyOC0zLjM2MS0wLjYxNy01LjA2NC0wLjg2OGwtMC40ODgtMC4wNzdjLTAuMDE5LDAtMC4wMzItMC4wMTMtMC4wNTEtMC4wMTNsLTAuNDg4LTAuMDY0DQoJCWMtMS40MTQtMC4yMTItMi44MjEtMC40MTEtNC4yODctMC41NzhsLTQuOTg3LTAuNDExYy02LjEzMS0wLjQwNS0xMi40NDktMC4zOTItMTguNTA5LDAuMDUxbC0xLjc2NywwLjE0OGwtMC44MjMsMC4wNjQNCgkJbC0yLjA2MywwLjE4NmMtMS44OTYsMC4xOTktMy43NzksMC40NjMtNS42NjIsMC43NjVsLTAuNTUzLDAuMDc3Yy0xLjI4NSwwLjIxMi0yLjU3MSwwLjQ1LTMuODM3LDAuNjg4DQoJCWMtMS40MDcsMC4yNTEtMi43OTYsMC41MjctNC4xODQsMC44MjljLTIuNjg2LDAuNjA0LTUuMzU0LDEuMjkyLTcuOTM3LDIuMDQ0Yy0yLjA1NywwLjU5MS00LjA4NywxLjI0LTUuOTk2LDEuODk2bC0xLjMyNCwwLjQ3Ng0KCQljLTQuMDQ5LDEuNDMzLTguMDcyLDMuMDc4LTExLjk2Nyw0Ljg4NGwtMS4wNDEsMC40OTVsLTAuMDE5LDAuMDI2Yy00NS41NDcsMjEuOC03NC45MTgsNjguMjQ3LTc0LjkxOCwxMTguNjQ2DQoJCWMwLDEuMTU3LDAuMDc3LDIuMjk0LDAuMTQ4LDMuNDM4bDAuMzQxLDcuOTk1SDI4OS41bDAuMzUzLTcuOTA1YzAuMDc3LTEuMTcsMC4xNDgtMi4zMzMsMC4xNDgtMy41MjgNCgkJQzI5MC4wMDEsMjU0LjE4OCwyNTkuOTE3LDIwNy4zMywyMTMuMzEsMTg1Ljg3N3ogTTM5LjY4MiwzMDMuOTdjMC41NTMtNDUuMjUxLDI3LjMwOC04Ni43NjIsNjguMDg2LTEwNS44ODJsMS4zMTEtMC41MTQNCgkJbDAuMTU0LTAuMTQ4YzMuMTk0LTEuNDU5LDYuNDkxLTIuNzg5LDkuODMzLTMuOTY1bDEuMDYtMC4zNzljMS44MTktMC42MywzLjYzMS0xLjIwOCw1LjUxNC0xLjc0Mg0KCQljMi4zNDYtMC42ODgsNC43MzctMS4zMDUsNy4xMzQtMS44NDRjMS4yNC0wLjI2MywyLjQ4MS0wLjUxNCwzLjc2LTAuNzUyYzEuMDE1LTAuMTg2LDIuMDI0LTAuMzc5LDMuMDQ2LTAuNTRsMC41MDEtMC4wOQ0KCQljMS44MzgtMC4yODksMy42ODMtMC41NTMsNS41MjEtMC43NTJsNC4yMDMtMC4zNjZjNS41MDEtMC40MDUsMTAuNzY1LTAuNDYzLDE3LjE0LDBsNC4wODcsMC4zNDENCgkJYzEuMDA5LDAuMTE2LDIuMDE4LDAuMjUxLDMuMjQ2LDAuNDI0bDEuNDcyLDAuMjEyYzEuNTM2LDAuMjI1LDMuMDcyLDAuNDg4LDQuNjE0LDAuNzc4bDAuNzIsMC4xMzUNCgkJYzAuODY4LDAuMTYxLDEuNzI5LDAuMzI4LDIuNTQ1LDAuNTAxYzIuNTMyLDAuNTUzLDUuMDE5LDEuMjA4LDcuNDg3LDEuOTIyYzEuNjMyLDAuNDc2LDMuMjUyLDAuOTY0LDQuODMzLDEuNDkxDQoJCWMyLjAwNSwwLjY2OCwzLjk4NSwxLjM5NSw1Ljk0NSwyLjE3MmMxLjg4MywwLjczOSwzLjc0LDEuNTMsNS41NzgsMi4zNzJsMC4zMjEsMC4xNDhjNDEuNzA0LDE5LjEzMyw2OC43ODYsNjAuNzc5LDY5LjMzOSwxMDYuNDY3DQoJCUgzOS42ODJWMzAzLjk3eiBNMTI2LjY0NCwxNTcuNTk5YzAuOTY0LDAuNDA1LDEuOTYsMC43NTgsMi45NTYsMS4xMTJsMi4wODksMC43NThjMC44MDMsMC4zMDgsMS42MTMsMC42MTEsMi40MzYsMC44NjgNCgkJYzcuNjYxLDIuNDEsMTUuNjc1LDMuNjUsMjMuODI0LDMuNzE1bDAuNjQ5LDAuMDEzYzIuNzk2LDAsNS41OTgtMC4xNDgsOC4yODQtMC40MjRjMC45MjUtMC4wOSwxLjgyNS0wLjIzOCwyLjczMS0wLjM5Mg0KCQlsMi4wMTItMC4zMDJjMS4xMzEtMC4xNDgsMi4yNjItMC4zMTUsMy40NDUtMC41NDZjMC44MS0wLjE2NywxLjU5NC0wLjM3OSwyLjM3OC0wLjU5MWwyLjE5OC0wLjU1OQ0KCQljMS4wODYtMC4yNjMsMi4xNzItMC41MjcsMy4yNDYtMC44NjFjMC42NjgtMC4yMTIsMS4zMjQtMC40NTYsMS45NzMtMC43MDFsMS43NjctMC42MzZjMS4yNi0wLjQzNywyLjUzMi0wLjg4NywzLjgwNS0xLjQyDQoJCWMwLjQ5NS0wLjIxMiwwLjk3Ny0wLjQ0MywxLjQ1Mi0wLjY3NWwwLjU3Mi0wLjI4M2MxLjc0Mi0wLjc3OCwzLjQ3Ny0xLjU3NSw1LjE5OS0yLjVsMS4xMTgtMC42NjgNCgkJYzEuOTI4LTEuMDkzLDMuODUtMi4yMjQsNS43OTctMy41NTRjMS4wMDktMC42ODEsMS45NzMtMS40NDYsMi45MjQtMi4yMDRsMy4yOTEtMi41NThjMTguOTIxLTE1LjY2MiwyOS43OTUtMzguNjQ1LDI5Ljc5NS02Mi40ODINCgkJbDAuMDM5LTAuNjgxYzAtNDUuMjMyLTM2LjgtODIuMDI2LTgyLjAzMi04Mi4wMjZjLTQzLjE3NSwwLTc5LjA5NSwzMy43Ni04MS43NzUsNzYuODU5bC0wLjA3MSwxLjA2Nw0KCQljLTAuMTAzLDEuMzU2LTAuMTg2LDIuNzEyLTAuMTg2LDQuMUM3Ni41NDcsMTE1LjA2Niw5Ni4yMDcsMTQ0LjcyNiwxMjYuNjQ0LDE1Ny41OTl6IE04OS41NjEsNzguODE5bDAuMDc3LTEuMTU3DQoJCWMyLjI2Mi0zNi4zNDQsMzIuNTQ1LTY0LjgwOCw2OC45NDctNjQuODA4YzM4LjE1LDAsNjkuMTc4LDMxLjAyOSw2OS4yMTEsNjguNTg3bC0wLjAzOSwwLjY3NQ0KCQljLTAuMDI2LDIwLjU3OS05LjIwMywzOS45NTYtMjUuMjM4LDUzLjI2NmwtMy4wNTMsMi4zMjdjLTAuNjgxLDAuNTUzLTEuMzY5LDEuMTA1LTIuMjI0LDEuNjk3DQoJCWMtMS41NDIsMS4wNDgtMy4xNzUsMS45OTItNC44MzMsMi45MzFsLTAuOTE5LDAuNTU5Yy0xLjM4OCwwLjc0Ni0yLjg0NywxLjQwNy00LjM2NCwyLjA4MmwtMS43MDMsMC44MjMNCgkJYy0wLjk3NywwLjQwNS0yLjAwNSwwLjc1OC0zLjAyMSwxLjExMmwtMi4xMjEsMC43NjVjLTAuNDExLDAuMTU0LTAuODI5LDAuMzIxLTEuMjM0LDAuNDQzYy0wLjc5LDAuMjQ0LTEuNiwwLjQzMS0yLjQwNCwwLjYzDQoJCWwtMi41NjQsMC42NTZjLTAuNTUzLDAuMTQ4LTEuMDk5LDAuMzAyLTEuNTg3LDAuNDA1Yy0wLjg1NSwwLjE2Ny0xLjcyOSwwLjI4My0yLjU5NiwwLjQwNWwtMi40NDIsMC4zNjYNCgkJYy0wLjU5MSwwLjEwMy0xLjE4MywwLjIwNi0xLjg0NSwwLjI3Yy0yLjE0LDAuMjI1LTQuMjkzLDAuMzQ3LTYuNDc4LDAuMzY2bC0wLjYwNC0wLjAwNmgtMC4wMTMNCgkJYy03LjAzNy0wLjAwNi0xMy45NDYtMS4wNTQtMjAuNTUzLTMuMTIzYy0wLjU3Mi0wLjE4LTEuMTMxLTAuNDA1LTEuNjktMC42MTdsLTIuNDE2LTAuODhjLTAuNzUyLTAuMjY0LTEuNDk3LTAuNTIxLTIuMjE3LTAuODIzDQoJCUMxMDUuOTgyLDEzNC45MTksODkuNCwxMDkuODkyLDg5LjQsODIuMDMyQzg5LjQsODAuOTQ2LDg5LjQ4NCw3OS44NzksODkuNTYxLDc4LjgxOXoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"} width="30" />
                      </div>
                      <p className="user-name">{currentSession.ideatorId} ({ideatorInfo.displayName ? ideatorInfo.displayName : "--"}) <span>{currentSession.startTime ? moment(currentSession.startTime).format("HH:mm") : '00:00'} - {currentSession.endTime ? moment(currentSession.endTime).format("HH:mm") : '00:00'}</span></p>
                    </div>
                    <div className="col-md-5">
                      <div className="user-action-btn">
                        <button className="btn-theme" onClick={(event) => this.onAcceptOrReject(event, "approved", currentSession, selectedCount)}>Approve Session</button>
                        <button className="btn-trans" onClick={(event) => this.onAcceptOrReject(event, "rejected", currentSession, selectedCount)}>Reject Session</button>
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <p className="label-top-fix">
                        <label>Hits:</label>
                        <span style={{marginLeft: "15px"}}>
                          <label>Idea</label>
                          <span className="idea-dot-icon"></span>
                        </span>
                        <span>
                          <label>Inspiration</label>
                          <span className="inspiration-star-icon"></span>
                        </span>
                      </p>
                      <div className="dots">
                        <div className="dots-strip">
                          {this.getTimelineContent()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="idea-contain">
                  <p className="label-top-fix"><label>Ideas:</label> <span style={{color: "#333"}}>{selectedCount}/{currentSession.ideas.length} selected</span></p>
                  {ideasList}
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
    challenge: state.challenges.single,
    token: state.auth.userInfo.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadChallengeRequest, approveOrRejectIdeas }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengeSessionViewScreen))

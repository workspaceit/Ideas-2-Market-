import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { loadChallengesRequest } from '../actions/challenges'
import { Challenge, EmptyChallenge } from '../components'
// import './challenges.css'


class ChallengesScreen extends Component {
  componentDidMount() {
    this.props.loadChallengesRequest()
  }

  eventCopyLink = () => {
    this.props.util.notify('info', 'Link copied')
  }

  render() {
    const { challenges } = this.props

    return (
      <div className="container cc-margin-fix">
        <div className="col-md-12 text-center">
          <button className="btn-challange" onClick={() => this.props.history.push('/challenges/new')}>Create new Challenge</button>
          <div className="col-md-8 center-block">
            <div className="row clearfix scontainer mt-100">
              <h4>My Challenges</h4>
              {challenges.all.map((challenge, index) =>
                <Challenge key={index}
                  challenge={challenge}
                  eventCopyLink={this.eventCopyLink}
                />
              )}
              <EmptyChallenge count={challenges.all.length} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    challenges: state.challenges,
    util: state.util
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadChallengesRequest }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengesScreen))

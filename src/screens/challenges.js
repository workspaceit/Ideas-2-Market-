import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
// import './challenges.css'
import { Header, Challenge, EmptyChallenge } from '../components';


class ChallengesScreen extends Component {

  eventCopyLink = () => {
    alert('Link copied')
  }

  render() {
    const challenges = [
      {
        "state": "published",
        "title": "Challenge 2",
        "created": "2018-12-10T09:30:46",
        "lastModified": "2018-12-10T09:30:46",
        "published": "2018-12-18T10:34:11",
        "closed": null,
        "config": {
          "timePerSessionInMs": 1200,
          "taskDescription": "Task Description Challenge 2",
          "challengeDescription": "Challenge Description Challenge 2"
        },
        "numberIdeas": 12,
        "numberSessions": 2,
        "sessionLink": "https://bit.ly/2ErydFz",
        "_links": {
          "self": {
            "href": "http://localhost:8080/api/challenges/d409963e-43dd-429c-9f8f-f1fb3ebc1425"
          },
          "challenge": {
            "href": "http://localhost:8080/api/challenges/d409963e-43dd-429c-9f8f-f1fb3ebc1425"
          },
          "findByChallengeId": [{
            "href": "http://localhost:8080/api/ideas/search/findByChallengeId?challengeId=d409963e-43dd-429c-9f8f-f1fb3ebc1425"
          }, {
            "href": "http://localhost:8080/api/ideationSessions/search/findByChallengeId?challengeId=d409963e-43dd-429c-9f8f-f1fb3ebc1425"
          }]
        }
      }, {
        "state": "draft",
        "title": "Challenge 1",
        "created": "2018-11-18T10:34:11",
        "lastModified": "2018-12-18T10:34:11",
        "published": null,
        "closed": null,
        "config": null,
        "numberIdeas": 0,
        "numberSessions": 0,
        "sessionLink": null,
        "_links": {
          "self": {
            "href": "http://localhost:8080/api/challenges/c352b48c-59d1-4a1e-94a1-852034d40f9a"
          },
          "challenge": {
            "href": "http://localhost:8080/api/challenges/c352b48c-59d1-4a1e-94a1-852034d40f9a"
          },
          "findByChallengeId": [{
            "href": "http://localhost:8080/api/ideas/search/findByChallengeId?challengeId=c352b48c-59d1-4a1e-94a1-852034d40f9a"
          }, {
            "href": "http://localhost:8080/api/ideationSessions/search/findByChallengeId?challengeId=c352b48c-59d1-4a1e-94a1-852034d40f9a"
          }]
        }
      }, {
        "state": "published",
        "title": "Challenge 3",
        "created": "2018-09-20T10:40:08",
        "lastModified": "2018-12-18T10:34:11",
        "published": "2018-09-28T10:35:40",
        "closed": "2018-10-04T10:40:25",
        "config": {
          "timePerSessionInMs": 1200,
          "taskDescription": "Task Description Challenge 3",
          "challengeDescription": "Challenge Description Challenge 3",
          "_links": {
            "inspirations": {
              "href": "http://localhost:8080/api/inspirations/81d4c503-5d91-48f1-b719-8be618ac179d"
            }
          }
        },
        "numberIdeas": 158,
        "numberSessions": 12,
        "sessionLink": "https://bit.ly/2EqWhYe",
        "_links": {
          "self": {
            "href": "http://localhost:8080/api/challenges/17b2dafd-0786-4b30-ab55-40dd937064ca"
          },
          "challenge": {
            "href": "http://localhost:8080/api/challenges/17b2dafd-0786-4b30-ab55-40dd937064ca"
          },
          "findByChallengeId": [{
            "href": "http://localhost:8080/api/ideas/search/findByChallengeId?challengeId=17b2dafd-0786-4b30-ab55-40dd937064ca"
          }, {
            "href": "http://localhost:8080/api/ideationSessions/search/findByChallengeId?challengeId=17b2dafd-0786-4b30-ab55-40dd937064ca"
          }]
        }
      }
    ];

    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="col-md-12 text-center">
            <button className="btn-challange" onClick={() => this.props.history.push('/challenges/new')}>Create new Challenge</button>
            <div className="col-md-8 center-block">
              <div className="row clearfix scontainer mt-100">
                <h4>My Challenges</h4>
                {challenges.map((challenge, index) =>
                  <Challenge key={index}
                    challenge={challenge}
                    eventCopyLink={this.eventCopyLink}
                  />
                )}
                <EmptyChallenge count={challenges.length} />

              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengesScreen))

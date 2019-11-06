import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Introduction extends Component {
  render() {
    return (
      <div>
        <h2 className="landing-header"><span>Brainstorm Ideas for a New Technology</span><span className="fix-border"></span></h2>
        <div className="row clearfix about-area">
          <div className="col-md-4">
            <strong className="head-m">What is my task?</strong>
            <p>
              In this brainstorming challenge you will create ideas for a new technology. You will have 30 minutes time to think about ideas. After the session you will be
              asked to fill out a small survey.
            </p>
          </div>
          <div className="col-md-4">
            <strong className="head-m">Who are we?</strong>
            <p>
              At the research lab for <strong>Human-Centered-Computing</strong> at the <strong>Freie Universitet Berlin (Germany)</strong>, we are currently developing a system for brainstorming and creativity support called Innovonto. This system uses Natural Language Processing and Semantic Technologies to support users in brainstorming sessions. You can find more about it <a href="#">here</a>.                  
            </p>
          </div>
          <div className="col-md-4">
            <strong className="head-m">What happens to my ideas?</strong>
            <p>
              We will publish all submitted ideas anonymously using github. You can see the ideas after the study is done by visiting our <a href="#">github page</a>.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Introduction)

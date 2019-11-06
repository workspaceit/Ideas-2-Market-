import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { i2mLogoWhite } from '../../resources'


class FAQScreen extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-invert">
          <div className="col-md-6 center-block">
            <p className="logo-invert"><img src={i2mLogoWhite} alt="i2m" /></p>
            <h2 className="landing-header landing-header-no-dec">
              <span>Frequently Asked Questions</span>
              <Link className="close-modal" to='/session'> X </Link>
            </h2>
            <div className="row clearfix about-area">
              <div className="col-md-12 faq">
                <div className="row clearfix border-top">
                  <div className="col-md-4">
                    <strong>What happens to my ideas?</strong>
                  </div>
                  <div className="col-md-8">
                    Hier finder der Nutzer eine exakte Anwort auf seine Frage.
                        </div>
                </div>
                <div className="row clearfix border-top">
                  <div className="col-md-4">
                    <strong>What happens to my ideas?</strong>
                  </div>
                  <div className="col-md-8">
                    Hier finder der Nutzer eine exakte Anwort auf seine Frage.
                        </div>
                </div>
                <div className="row clearfix border-top">
                  <div className="col-md-4">
                    <strong>What happens to my ideas?</strong>
                  </div>
                  <div className="col-md-8">
                    Hier finder der Nutzer eine exakte Anwort auf seine Frage.
                        </div>
                </div>
                <div className="row clearfix border-top">
                  <div className="col-md-4">
                    <strong>What happens to my ideas?</strong>
                  </div>
                  <div className="col-md-8">
                    Hier finder der Nutzer eine exakte Anwort auf seine Frage.
                        </div>
                </div>
                <div className="row clearfix border-top border-bottom">
                  <div className="col-md-4">
                    <strong>What happens to my ideas?</strong>
                  </div>
                  <div className="col-md-8">
                    Hier finder der Nutzer eine exakte Anwort auf seine Frage.
                        </div>
                </div>
              </div>
            </div>
            <div className="btn-area text-center">
              <button className="btn-challange">Ok - Let's start</button>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(FAQScreen)

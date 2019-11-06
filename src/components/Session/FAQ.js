import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class FAQ extends Component {
  render() {
    const { onModalClose } = this.props

    return (
      <div>
        <h2 className="landing-header landing-header-no-dec">
          <span>Frequently Asked Questions</span>
          <a className="close-modal" onClick={onModalClose} href='#'> X </a>
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
      </div>
    )
  }
}

export default withRouter(FAQ)

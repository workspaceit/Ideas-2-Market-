import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { publishChallengeRequest, loadChallengeRequest } from "../../actions/challenges";


class Challenge extends Component {
  onPublishClick = (challengeLink) => {
    this.props.publishChallengeRequest(challengeLink)
  }

  onLoadChallengeClick = (challengeLink, withIdeas=false) => {
    this.props.loadChallengeRequest(challengeLink, withIdeas)
  }

  formatDateTime = value => {
    return typeof value === 'string' ? value.substring(0,10) : value
  }

  render() {
    const {challenge, eventCopyLink} = this.props;
    let content = '';

    if (challenge.state === 'draft') {
      content = <div className="col-md-4">
        <div className="shell">
          <p className="btn-contain">
            <span
              className="draft"
              onClick={() => this.onLoadChallengeClick(challenge._links.self.href)}
            >
              Draft
            </span>
            <span style={{marginLeft: '5px'}}>{ this.formatDateTime(challenge.lastModified) }</span>
          </p>
          <p className="btn-contain">
            <span
              className="publish"
              onClick={() => this.onPublishClick(challenge._links.self.href)}
            >
              Publish
            </span>
          </p>
          <p className="shell-name"> {challenge.title} </p>
          <p className="shell-stat"><span>--</span>&nbsp;Ideas / <span>--</span>&nbsp;People</p>
        </div>
      </div>
    } else if (challenge.state === 'published') {
      content = <div className="col-md-4">
        <div className="shell">
          <p className="btn-contain">Published</p>
          <p className="btn-contain">{ this.formatDateTime(challenge.published) }</p>
          <p className="shell-name" onClick={() => this.onLoadChallengeClick(challenge._links.self.href, true)}> {challenge.title} </p>
          <p className="shell-stat"><span>{challenge.numberIdeas}</span>&nbsp;Ideas
            / <span>{challenge.numberSessions}</span>&nbsp;People</p>
          {/* <p className="">
            <input style={{ fontSize: "10px" }} type="text" readOnly value={challenge.sessionLink} />
            <CopyToClipboard text={challenge.sessionLink}>
              <button onClick={eventCopyLink}>Copy</button>
            </CopyToClipboard>
          </p> */}
          <div className="shell-url-container">
            <input className="shell-url" type="text" value={challenge.sessionLink} readOnly={true}/>
            <CopyToClipboard text={window.origin + challenge.sessionLink}>
              <button className="shell-btn-copy" onClick={eventCopyLink}>Copy</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    }
    return content;
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ publishChallengeRequest, loadChallengeRequest }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Challenge));

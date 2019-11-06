import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logoutRequest } from '../../actions/auth'
import { i2mLogoLite } from '../../resources'


class Header extends Component {
  logout = (event) => {
    event.preventDefault()
    this.props.logoutRequest()
  }

  render() {
    const { userInfo } = this.props
    let displayName = `${userInfo.firstname} ${userInfo.lastname}`.trim()
    if (displayName === '') {
      displayName = userInfo.username
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top nav-cstm">
        <div className="container-fluid">
          <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/challenges">
            <img src={i2mLogoLite} />
          </Link>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
            <a href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false">
              {displayName}
              <span className="caret" />
            </a>
            <ul className="dropdown-menu">
              <li><a onClick={this.logout} href="#">Logout</a></li>
            </ul>
            </li>
          </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutRequest }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))

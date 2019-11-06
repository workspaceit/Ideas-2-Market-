import React, { Component } from 'react';
import { i2mLogoLite } from '../../resources'


class Header extends Component {
  render() {
    const user = {"username":"admin","firstname":"admin","lastname":"admin","email":"admin@admin.com","authorities":[{"authority":"ROLE_IDEATOR"},{"authority":"ROLE_MODERATOR"}],"enabled":true};
    const user_full_name = user.firstname + ' ' + user.lastname;

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
            <a className="navbar-brand" href="#">
              <img src={i2mLogoLite} />
            </a>
            </div>
        
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{user_full_name} <span className="caret"></span></a>
                <ul className="dropdown-menu">
                    <li><a href="#">Logout</a></li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    )
  }
}

export default Header;

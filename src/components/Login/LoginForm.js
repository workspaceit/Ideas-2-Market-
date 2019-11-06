import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class LoginForm extends Component {
  render() {
    const {
      email,
      errorMessage,
      password,
      onEmailChange,
      onLoginClick,
      onPasswordChange,
      togglePasswordVisibility,
      canSubmit
    } = this.props

    return (
      <form className="form-horizontal">
        <h4>Login</h4>
        <div className="form-group">
          <div className="col-md-2" />
          <div className="col-md-10">Credentials</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="inputEmail3" className="col-sm-2 control-label">E-Mail</label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail3"
              placeholder="mustermann@mustermail.de"
              value={email.value}
              onChange={onEmailChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
          <div className="col-sm-10 has-feedback">
            <input
              type={`${password.visible ? "text" : "password"}`}
              className="form-control"
              id="inputPassword3"
              placeholder="password has to be at least 6 characters"
              value={password.value}
              onChange={onPasswordChange}
            />
            <span
              className={`glyphicon glyphicon-eye-${password.visible ? "open" : "close"} form-control-feedback`}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        
        <div className="form-group">
        { errorMessage &&
          <React.Fragment>
            <div className="col-md-2">
            </div>
            <div className="col-md-10">
              <div className="alert alert-danger alert-dismissible fade in">
                <strong>{ errorMessage }</strong>
              </div>
            </div>
          </React.Fragment>
        }
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button
              type="submit"
              className="btn-login"
              onClick={onLoginClick}
              disabled={!canSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default withRouter(LoginForm)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { checkLogin, loginRequest } from '../actions/auth'
import { LoginForm } from '../components'


class LoginScreen extends Component {
  state = {
    email: {
      value: '',
      valid: false
    },
    password: {
      value: '',
      valid: false,
      visible: false
    }
  }

  componentDidMount() {
    const { checkLogin, boot } = this.props

    if (!boot.done) {
      checkLogin()
    }
  }

  validateField = (fieldName) => {
    const field = { ...this.state[fieldName] }
    let valid = false

    switch(fieldName) {
      case 'email':
      if (field.value.length >= 3) {
        valid = true
      }
      break;
      case 'password':
      if (field.value.length >= 3) {
        valid = true
      }
      break;
      default:
      break;
    }

    this.setState({ [fieldName]: { ...field, valid } })
  }

  canSubmit = () => {
    const { email, password } = this.state
    return email.valid && password.valid
  }

  onEmailChange = (event) => {
    let self = this
    let email = { ...this.state.email }
    email.value = event.target.value
    this.setState({ email }, () => {
      self.validateField('email')
    })
  }

  onLoginClick = (event) => {
    event.preventDefault()
    const email = this.state.email.value
    const password = this.state.password.value
    this.props.loginRequest(email, password)
  }

  onPasswordChange = (event) => {
    let self = this
    let { password } = this.state
    password.value = event.target.value
    this.setState({ password }, () => {
      self.validateField('password')
    })
  }

  togglePasswordVisibility = () => {
    let { password } = this.state
    password.visible = !password.visible
    this.setState({ password })
  }

  render() {
    const {
      email,
      password
    } = this.state
    const {
      attempted,
      errorMessage
    } = this.props

    return (
      <div className="login-bg">
        <div className="login">
          <LoginForm
            attempted={attempted}
            email={email}
            errorMessage={errorMessage}
            password={password}
            onEmailChange={this.onEmailChange}
            onLoginClick={this.onLoginClick}
            onPasswordChange={this.onPasswordChange}
            togglePasswordVisibility={this.togglePasswordVisibility}
            canSubmit={this.canSubmit()}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    boot: state.auth.boot,
    attempted: state.auth.login.attempted,
    errorMessage: state.auth.login.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ checkLogin, loginRequest }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginScreen))

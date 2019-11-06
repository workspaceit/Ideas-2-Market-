import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { setSubscriptionFormData } from '../../actions/session'
import { i2mLogoDark } from '../../resources'


class endScreen extends Component {
  state = {
    readyToRender: false,
    dateOfBirth: {
      value: null,
      valid: true
    },
    firstName: {
      value: '',
      valid: false
    },
    lastName: {
      value: '',
      valid: false
    },
    gender: {
      value: '',
      valid: true
    },
    nationality: {
      value: '',
      valid: true
    },
    age: {
      value: '',
      valid: true
    },
    highestDegree: {
      value: '',
      valid: true
    },
    highestDegreeOther: {
      value: '',
      valid: true
    },
    occupation: {
      value: '',
      valid: true
    },
    email: {
      value: '',
      valid: false
    },
    confirmEmail: {
      value: '',
      valid: false
    },
    canSubmit: false
  }

  componentDidMount() {
    const { session } = this.props
    const sessionId = this.props.match.params.session_id;
    if (session[sessionId].ideatorInfo === null) {
      this.redirectToParent()
    } else if (this.state.readyToRender !== true) {
      this.setState({ readyToRender: true })
    }

    if (session.subscription.formData !== null) {
      this.setState({ ...session.subscription.formData })
    }
  }

  validateField = (fieldName) => {
    let { [fieldName]: field } = this.state
    switch (fieldName) {
      case 'firstName':
        if (field.value.length < 2) {
          field.valid = false;
        }else{
          field.valid = true;
        }
        break;
      case 'lastName':
        if (field.value.length < 3) {
          field.valid = false;
        }
        break;
      case 'dateOfBirth':
        if (field.value === null || true) {
          field.valid = true;
        }
        break;
      case 'email':
        if (field.value.length < 3) {
          field.valid = false;
        }
        break;
      case 'confirmEmail':
        if (field.value.length < 3 || field.value !== this.state.email.value) {
          field.valid = false;
        }
        break;
      default:
        break;
    }
    let canSubmit = this.state.firstName.valid
    this.setState({ [fieldName]: { ...field }, canSubmit })
  }

  onDOBChange = (date) => {
    let { dateOfBirth } = this.state
    dateOfBirth.value = date
    this.setState({ dateOfBirth })
  }

  onValueChange = (event, fieldName) => {
    let self = this
    let { [fieldName]: field } = this.state
    field.value = event.target.value
    this.setState({ [fieldName]: { ...field } }, () => {
      self.validateField(fieldName);
    })
  }

  redirectToParent = () => {
    const sessionId = this.props.match.params.session_id
    this.props.history.push(`/session/${sessionId}`)
  }

  setRadioValue = (e, fieldName) => {
    if (e.target.type === 'radio'){
      let { [fieldName]: field } = this.state;
      field.value = e.target.value;
    } else if (e.target.type === 'text') {
      let { highestDegreeOther } = this.state;
      highestDegreeOther.value = e.target.value;
      this.setState({ highestDegreeOther });
    }
  }

  formSubmitEvent = (e) => {
    e.preventDefault();
    const sessionId = this.props.match.params.session_id;
    this.props.setSubscriptionFormData(sessionId, this.state);
  }

  render() {
    const { readyToRender, firstName, age, nationality, occupation, canSubmit } = this.state

    if (readyToRender) {
      return (
        <div className="landing" style={{paddingTop: '30px'}}>
          <div className="navbar-brand"><img src={i2mLogoDark} alt="i2m" /></div>
          <div className="col-md-4 center-block" style={{marginTop: '50px'}}>
            <h1>End of session!</h1>
            <p><strong>Thank you for participating.</strong></p>
            <p>Please subscribe below if you want to receive updates from our project- Ideas2Market</p>
            <form className="subscribe" onSubmit={this.formSubmitEvent}>
              <div className="form-group radio-plz" onChange={(e) => this.setRadioValue(e, 'gender')}>
                <label>Gender</label><br/>
                <dl>
                  <input value="Male" type="radio" id="radio01" name="radioGender"/>
                  <label htmlFor="radio01"><span/>Male</label>
                </dl>
                <dl>
                  <input value="Female" type="radio" id="radio02" name="radioGender"/>
                  <label htmlFor="radio02"><span/>Female</label>
                </dl>
                <dl>
                  <input value="Other" type="radio" id="radio03" name="radioGender"/>
                  <label htmlFor="radio03"><span/>Other</label>
                </dl>
                <dl>
                  <input value="Prefer not to say" type="radio" id="radio04" name="radioGender"/>
                  <label htmlFor="radio04"><span/>Prefer not to say</label>
                </dl>
              </div>
              <div className="form-group">
                <label>Name</label>
                <div className="row clearfix">
                  <div className="col-md-8">
                    <input type="text" className="form-control" placeholder="Name" value={firstName.value} onChange={(event) => this.onValueChange(event, 'firstName')}/>
                  </div>
                  {/* <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Last name" value={lastName.value} onChange={(event) => this.onValueChange(event, 'lastName')}/>
                  </div> */}
                </div>
              </div>
              <div className="form-group">
                <label>Age</label>
                <div className="row clearfix">
                  <div className="col-md-4">
                    <input type="number" className="form-control" placeholder="Age" value={age.value} onChange={(event) => this.onValueChange(event, 'age')}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>What is your nationality?</label>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <input type="text" className="form-control" placeholder="Nationality" value={nationality.value} onChange={(event) => this.onValueChange(event, 'nationality')} />
                    {/* <DatePicker
                      selected={dateOfBirth.value}
                      onChange={this.onDOBChange}
                      dateFormat="dd.MM.yyyy"
                      placeholderText="DD.MM.YYYY"
                    /> */}
                  </div>
                </div>
              </div>
              <div className="form-group radio-plz" onChange={(e) => this.setRadioValue(e, 'highestDegree')}>
                <label>What is your highest level of education?</label><br/>
                <dl>
                  <input value='High Scool' type="radio" id="radio01-ed" name="radioEducation"/>
                  <label htmlFor="radio01-ed"><span/>High School</label>
                </dl>
                <dl>
                  <input value='Bachelor' type="radio" id="radio02-ed" name="radioEducation"/>
                  <label htmlFor="radio02-ed"><span/>Bachelor</label>
                </dl>
                <dl>
                  <input value='Master / Diploma' type="radio" id="radio03-ed" name="radioEducation"/>
                  <label htmlFor="radio03-ed"><span/>Master / Diploma</label>
                </dl>
                <dl>
                  <input value='Ph.D' type="radio" id="radio04-ed" name="radioEducation"/>
                  <label htmlFor="radio04-ed"><span/>Ph.D</label>
                </dl>
                <dl>
                  <input value='Professional Traning' type="radio" id="radio05-ed" name="radioEducation"/>
                  <label htmlFor="radio05-ed"><span/>Professional Traning</label>
                </dl>
                <dl>
                  <input value='' type="radio" id="radio06-ed" name="radioEducation"/>
                  <label htmlFor="radio06-ed"><span/></label>
                  <input type="text" className="form-control" placeholder="Other" style={{display:'inline', width: 'auto'}}/>
                </dl>
              </div>
              <div className="form-group">
                <label>What is your current occupation?</label>
                <div className="row clearfix">
                  <div className="col-md-8">
                    <input type="text" className="form-control" placeholder="Occupation" value={occupation.value} onChange={(event) => this.onValueChange(event, 'occupation')}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="checkbox">
                  <label>
                    <input type="checkbox"/> Please contact me when the result ideas are available
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"/> I'd like to receive notifications when there are new sessions available
                  </label>
                </div>
              </div>
              <div className="text-center">
                <button className="btn-subscribe" disabled={!canSubmit} title={canSubmit ? '' : 'Name required'}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )
    }  else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSubscriptionFormData }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(endScreen))

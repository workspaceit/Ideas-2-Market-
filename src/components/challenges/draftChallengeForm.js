import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeSingleFormDataRequest } from '../../actions/challenges'
import InspirationPreview from './InspirationPreview'


class DraftChallengeForm extends Component {
  state = {
    seconds: this.props.formData.seconds,
    minutes: this.props.formData.minutes,
    challengeDescription: this.props.formData.challengeDescription,
    taskDescription: this.props.formData.taskDescription,
    methodicalDescription: this.props.formData.methodicalDescription,
    inspirationText: this.props.formData.inspirationText,
    inspirationImageData: this.props.formData.inspirationImageData,
    inspirations: this.props.formData.inspirations,
    title: this.props.formData.title,
    inspirationErrorMessage: '',
    challengeDataError: this.props.formData.error,
    showChallengeDataError: false
  }

  componentDidMount() {
    this.props.changeSingleFormDataRequest({ ...this.state })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.formData.error !== this.props.formData.error) {
        this.setState({ challengeDataError: this.props.formData.error });
    }
  }

  onCreateInspiration = (event) => {
    event.preventDefault()
    let self = this
    const { inspirations, methodicalDescription, inspirationImageData, inspirationText } = this.state
    if (methodicalDescription === null || methodicalDescription.length < 1) {
      self.setState({inspirationErrorMessage: "Methodical description can not be empty"})
      return
    } else if ((inspirationImageData === null || inspirationImageData.length < 1) && (inspirationText === null || inspirationText.length < 1)) {
        self.setState({inspirationErrorMessage: "You must either provide an image or some text."})
        return
    } else{
        self.setState({inspirationErrorMessage: ""})
    }
    const currentInspiration = {
      inspirationImageData,
      inspirationText,
      methodicalDescription
    }
    this.setState({ inspirations: inspirations.concat([currentInspiration]), inspirationImageData: '', inspirationText: '', methodicalDescription: '' }, () => {
      self.props.changeSingleFormDataRequest({ ...this.state })
    })
    this.props.util.notify('info', 'Inspiration created')
  }

  onFileInputChange = () => {
    let self = this
    let file = this.fileInputRef.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.setState({ inspirationImageData: reader.result }, () => {
        self.props.changeSingleFormDataRequest({ ...this.state })
      })
    }
  }

  onTextInputChange = (event, fieldName) => {
    let self = this
    let value = event.target.value
    if (fieldName === 'seconds' || fieldName === 'minutes') {
      if (fieldName === 'seconds' && value > 59) return
      if (value.length > 2) return
      if (value.length > 0 && !/^\d+$/.test(value)) return
    }
    this.setState({ [fieldName]: value, showChallengeDataError: false }, () => {
      self.props.changeSingleFormDataRequest({ ...this.state })
    })
  }

  onRemoveInspiration = (event, index) => {
    event.preventDefault()
    let self = this
    let { inspirations } = this.state
    inspirations.splice(index, 1)
    this.setState({ inspirations }, () => {
      self.props.changeSingleFormDataRequest({ ...this.state })
    })
    this.props.util.notify('info', 'Inspiration deleted')
  }

  onPreviewClick = (event) => {
    if (this.state.challengeDataError !== null) {
        event.preventDefault();
        this.setState({ showChallengeDataError: true }, () => {
            window.scrollTo(0, 0);
        });
    }
  }

  render() {
    const challengeId = this.props.match.params.challengeId
    const {
      seconds,
      minutes,
      challengeDescription,
      taskDescription,
      methodicalDescription,
      inspirationText,
      inspirationImageData,
      inspirations,
      title,
      showChallengeDataError,
      challengeDataError
    } = this.state

    return (
      <div className="container new-challenge">
        <div className="tnav">
          <div className="row clearfix">
            <div className="col-md-4">
              <Link to="/challenges">&#60; Dashboard</Link>
            </div>
            <div className="col-md-4">
              <input className="form-control" type="text" placeholder="New Challenge" value={title} onChange={(event) => this.onTextInputChange(event, 'title')} />
            </div>
            <div className="col-md-4">
              <Link to={`/challenges/${challengeId}/preview`} className="tnav-pbtn" onClick={this.onPreviewClick}>Preview Challenge</Link>
            </div>
          </div>
        </div>

        <div className="col-md-8 center-block">
          {   challengeDataError !== null && showChallengeDataError &&
              <div className="alert alert-danger alert-dismissible fade in">
                  <strong>{ challengeDataError }</strong>
              </div>
          }
          <form className="form">
            {/* <div className="form-group">
              <label className="form-label">Title</label>
              <textarea className="form-control" value={title} onChange={(event) => this.onTextInputChange(event, 'title')} />
            </div> */}
            <div className="form-group">
              <label className="form-label">Task Description</label>
              <textarea className="form-control" value={taskDescription} onChange={(event) => this.onTextInputChange(event, 'taskDescription')} />
            </div>
            <div className="form-group">
              <label className="form-label">Challenge Description</label>
              <textarea className="form-control" value={challengeDescription} onChange={(event) => this.onTextInputChange(event, 'challengeDescription')} />
            </div>
            <div className="form-group">
              <label className="form-label">Time per session</label>
              <div className="timer">
                <input type="text" placeholder="MM" className="left" value={minutes} onChange={(event) => this.onTextInputChange(event, 'minutes')} />
                <span>:</span>
                <input type="text" placeholder="SS" className="right" value={seconds} onChange={(event) => this.onTextInputChange(event, 'seconds')} />
              </div>
            </div>
            <div className="configure">
              <p>Inspiration Configuration</p>
              <InspirationPreview
                inspirations={inspirations}
                removeInspiration={this.onRemoveInspiration}
              />
              <div className="inpiration clearfix">
                <div className="row clearfix">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Methodical Description</label>
                      <textarea className="form-control" value={methodicalDescription} onChange={(event) => this.onTextInputChange(event, 'methodicalDescription')} />
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Image</label>
                      <div className="img-droparea">
                        <div className="file-upload">
                          <label
                            htmlFor="upload"
                            className="file-upload__label"
                            style={{
                              backgroundImage: inspirationImageData.length < 1 ? 'none' : `url(${inspirationImageData})`,
                              backgroundSize: 'cover'
                            }}
                          >
                            <span className='image-label'>+</span>
                          </label>
                          <input
                            ref={input => this.fileInputRef = input}
                            id="upload"
                            className="file-upload__input"
                            type="file"
                            multiple={false}
                            accept="image/x-png,image/png"
                            name="file-upload"
                            onChange={this.onFileInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Text</label>
                      <textarea className="form-control" value={inspirationText} onChange={(event) => this.onTextInputChange(event, 'inspirationText')} />
                    </div>
                  </div>
                </div>
                  <div className="row clearfix">
                      <div className="col-md-12">
                          {   this.state.inspirationErrorMessage.length > 0 &&
                              <div className="alert alert-danger alert-dismissible fade in">
                                  <strong>{ this.state.inspirationErrorMessage }</strong>
                              </div>
                          }
                      </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-12 text-right">
                      <a onClick={this.onCreateInspiration} href="#" className="inspire-link">Create Inspiration</a>
                    </div>
                </div>
              </div>
            </div>
          </form>

          <div className="text-right">
            <Link to={`/challenges/${challengeId}/preview`} className="preview-btn-g" onClick={this.onPreviewClick}>Preview Challenge</Link>
          </div>
          <div className="blank-div"></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formData: state.challenges.single.formData,
    util: state.util,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSingleFormDataRequest }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DraftChallengeForm));

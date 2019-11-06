import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { InspirationElement, TimeUpModal, notify, Toastify } from '../../components'
import { addEventRequest, addIdeaRequest, submitSessionRequest, sessionRequest, tickTimer } from '../../actions/session'
import { toggleLoader2 } from '../../actions/util'
import apiEndpoint, { ICV_ENDPOINT } from '../../utils/api';
import { icvData } from '../../utils/mockData';
import _ from 'lodash';
import { i2mLogoDark } from '../../resources'
import { Loader2 } from '../../components'


class SessionScreen extends Component {
  state = {
    readyToRender: false,
    idea: {
      value: '',
      valid: false
    },
    textAreaDisable: false,
    startTime: new Date().toISOString(),
    timePerSessionInMs: null,
    inspireMe: false,
    inspireIndex: -1,
    inspirations: [],
    timerInitialized: false,
    timerPaused: false,
    annotationCandidates: null,
    currentCandidate: null,
    icvResults: null,
    step: '', // empty, validate, cvalidate, submit
    submittable: false
  }

  componentWillMount() {
    document.body.style.paddingTop = 0;
  }

  onFocus = () => {
    this.setState({ timerPaused: false });
  }

  onBlur = () => {
    this.setState({ timerPaused: true });
  }

  onChangeCandidate = ({ text, offset }) => {
    this.setState({ currentCandidate: { text, offset } });
  }

  onKeyPress = (event) => {
    // event.preventDefault();
    if (event.target.nodeName !== 'TEXTAREA') {
      if (event.keyCode == 13 && event.shiftKey == false) {
        const { step, currentCandidate } = this.state;
        if ((step === 'cvalidate') && (currentCandidate !== null)) {
          this.candidateValidate(event);
        } else if (step === 'submit') {
          this.onSubmitIdea(event);
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.onFocus);
    window.removeEventListener('blur', this.onBlur);
    window.removeEventListener('keypress', this.onKeyPress);
    try {
      clearInterval(this.timerInterval);
    } catch(error) {
      console.log(error);
    }
  }

  componentDidMount() {
    window.addEventListener('focus', this.onFocus);
    window.addEventListener('blur', this.onBlur);
    window.addEventListener('keypress', this.onKeyPress);
    const { session } = this.props;
    const sessionId = this.props.match.params.session_id;
    this.props.sessionRequest('start', sessionId);
    this.initTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    const sessionId = this.props.match.params.session_id;
    const nCurrentSession = this.props.session[sessionId];
    const pCurrentSession = prevProps.session[sessionId];

    if (nCurrentSession && nCurrentSession.timer === 0) {
      try {
        clearInterval(this.timerInterval);
      } catch(error) {
        console.log(error);
      }
    }
  }

  initTimer = () => {
    let self = this;
    const { timerInitialized } = this.state;
    if (!timerInitialized) {
      this.setState({ timerInitialized });
    }
    const sessionId = this.props.match.params.session_id
    this.timerInterval = setInterval(() => {
      if (!self.state.timerPaused) {
        self.props.tickTimer(sessionId);
      }
    }, 1100);
  }

  validateFields = () => {
    const { idea } = this.state
    if (idea.value === null || idea.value.length < 3) {
      this.setState({ idea: { ...this.state.idea, valid: false } })
    } else {
      this.setState({ idea: { ...this.state.idea, valid: true } })
    }
  }

  secondsToTimeString = (totalSeconds) => {
    let minutes = parseInt(totalSeconds / 60)
    let seconds = totalSeconds - (minutes * 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  redirectToParent = () => {
    const sessionId = this.props.match.params.session_id
    this.props.history.push(`/session/${sessionId}`)
  }

  onSubmitIdea = (event) => {
    event.preventDefault();
    this.props.addEventRequest(this.props.match.params.session_id, 'idea-submit');
    const eventTime = new Date().toISOString(); //this.props.session.challengeInfo.config.timePerSessionInMs - this.state.timePerSessionInMs

    const { idea, annotationCandidates } = this.state;
    if (idea.valid) {
      this.props.addIdeaRequest(this.props.match.params.session_id, idea.value, eventTime, annotationCandidates)
      this.setState({ idea: {value: '', valid: false}, step: '', currentCandidate: null, annotationCandidates: null, icvResults: null, submittable: false });
    }
    // const sessionId = this.props.match.params.session_id
    // this.props.history.push(`/session/${sessionId}/end`)
  }

  onSubmitSession = (event) => {
    event.preventDefault()

    const { startTime } = this.state
    const challengeId = this.props.match.params.session_id
    this.props.submitSessionRequest(challengeId, { startTime })
  }

  onIdeaTextChange = (event) => {
    let self = this
    this.setState({ idea: { ...this.state.idea, value: event.target.value } }, () => {
      self.validateFields()
    })
  }

  onResetIdeaField = (event) => {
    event.preventDefault()
    let self = this
    this.setState({ idea: { ...this.state.idea, value: '' }, step: '', annotationCandidates: null, currentCandidate: null, submittable: false }, () => {
      self.validateFields()
    })
  }

  onEnterPress = (event) => {
    if(event.keyCode == 13 && event.shiftKey == false) {
      this.validate(event);
    }
  }

  inspireMe = () => {
    let { inspireMe, inspireIndex } = this.state;
    this.props.addEventRequest(this.props.match.params.session_id, 'inspiration-request');
    const currentSession = this.props.session[this.props.match.params.session_id];
    const inspirations = currentSession.inspirations;

    if (!inspireMe) {
      this.setState({ inspireMe: true, inspireIndex: 0 });
    } else {
      inspireIndex += 1;
      if (inspireIndex >= inspirations.length) {
        this.setState({ inspireIndex: 0 });
      } else {
        this.setState({ inspireIndex });
      }
    }
    // this.state.inspireMe = true
    // this.state.inspireIndex += 1
    // const inspireIndex = this.state.inspireIndex < inspirations.length ? this.state.inspireIndex : 0
    // this.setState({ inspireIndex })
  }

  displayInspiration = () => {
    const currentSession = this.props.session[this.props.match.params.session_id];
    const inspirations = currentSession.inspirations;
    if (inspirations.length === 0) {
      return null
    }
    if (this.state.inspireMe) {
      return (
        <InspirationElement inspiration={ inspirations[this.state.inspireIndex] }  />
      )
    } else {
      return (
        <div className="inspire-container">
          <p className="p-first">Click the button above and you will be presented with a set of others ideas.</p>
          <p>Fell Free to use them as inspiration: remix them with your own ideas, expand on them, or use them in any way you'd like!</p>
        </div>
      )
    }
  }

  validate = (event) => {
    event.preventDefault();
    let self = this;
    const { idea } = this.state;
    this.setState({ step: 'cvalidate' }, () => {
      // console.log(self.state);
      // setTimeout(() => {
      //   const icvDataClone = _.cloneDeep(icvData);
      //   const candidates = icvDataClone.annotation_candidates;
      //   let { idea } = this.state;
      //   idea.value = icvDataClone.text;
      //   self.setState({ annotationCandidates: candidates, idea });
      // }, 1800);

      const challengeId = this.props.match.params.session_id
      const session = this.props.session[challengeId]
      const { token } = session.ideatorInfo
      this.props.toggleLoader2()
      // apiEndpoint.get('/api/annotation/annotate', { params: { text: idea.value }, headers: { authorization: `Bearer ${token}` } })
      // apiEndpoint.get('/api/annotation/annotate', { params: { text: idea.value }, headers: { authorization: `Bearer ${token}` } })
      axios.get(`${ICV_ENDPOINT}/api/candidates`, { params: { text: idea.value, backend: 'all' }})
        .then(response => {
          const candidates = response.data.annotation_candidates;
          // setTimeout(() => {
            // const candidates = icvData.annotation_candidates;
          //   self.setState({ annotationCandidates: candidates });
          // }, 2500);
          if (candidates.length === 0) {
            self.setState({ annotationCandidates: candidates, step: 'submit', submittable: true });
          } else {
            self.setState({ annotationCandidates: candidates });
            candidates.sort(function(a, b) {
              return a.offset - b.offset;
            });
            // selecting a default word
            const defaultItem = candidates[0]
            self.onChangeCandidate({ text: defaultItem.text, offset: defaultItem.offset})
          }
          this.props.toggleLoader2()
        })
        .catch(error => {
          this.props.toggleLoader2()
          console.log(error);
          notify('error', 'data not found');
        });
    });
  }

  candidateValidate = (nothigFits=false) => {
    let { annotationCandidates, currentCandidate, step } = this.state;
    if (currentCandidate === null && annotationCandidates.length > 0) {
      return
    }
    const index = annotationCandidates.findIndex(candidate => candidate.text === currentCandidate.text && candidate.offset === currentCandidate.offset);
    if (annotationCandidates[index].validated !== true) {
      annotationCandidates[index].validated = true;
    }

    if (nothigFits) {
      for (let i = 0; i < annotationCandidates[index].resource_candidates.length; i++) {
        annotationCandidates[index].resource_candidates[i].selected = false;
      }
    }

    const validatedLength = annotationCandidates ? annotationCandidates.filter(candidate => candidate.validated === true).length : -1;
    if (step !== 'submit') {
      let submittable = false;
      if (annotationCandidates) {
        submittable = annotationCandidates.length === validatedLength;
      }
      if (submittable) {
        step = 'submit';
        this.state.submittable = true;
      }
    }
    this.setState({ annotationCandidates, currentCandidate: null, step });
    if ( index < annotationCandidates.length - 1) {
      // selecting next word
      const nextItem = annotationCandidates[index + 1]
      this.onChangeCandidate({ text: nextItem.text, offset: nextItem.offset})
    }
  }

  getVatidatedCandidateClass = (phrase) => {
    let className = "validated-candidate-nf"
    const phraseItem = this.state.annotationCandidates.find(item => item.text === phrase)
    phraseItem.resource_candidates.forEach(item => {
      if (item.selected){
        className = "validated-candidate"
        return
      }
    })
    return className
  }

  getHighlightedText = (text, higlights) => {
    const parts = [];
    for(let i=0; i<text.length; i++) {
      let higlighted = false;
      for(let j=0;j<higlights.length; j++) {
        if (higlights[j].offset === i) {
          i += higlights[j].text.length - 1;
          console.log(higlights[j])
          parts.push(
            <span
              key={`part${i*j+1}`}
              onClick={() => this.onChangeCandidate({ ...higlights[j] })}
              className={`${this.state.currentCandidate && this.state.currentCandidate.text === higlights[j].text && this.state.currentCandidate.offset === higlights[j].offset ? 'current-candidate' : (higlights[j].validated === true ? this.getVatidatedCandidateClass(higlights[j].text) : 'normal-candidate')}`}
            >
              {higlights[j].text}
            </span>);
          higlighted = true;
          break;
        }
      }

      if (!higlighted) {
        parts.push(text[i]);
      }
    }

    return (
      <div className='prev-control'>
        {parts}
      </div>
    );
  }

  onSelectCandidate = (index) => {
    let { currentCandidate, annotationCandidates } = this.state;
    if (annotationCandidates) {
      const annIndex = _.findIndex(annotationCandidates, { ...currentCandidate });
      let currCandidate = annotationCandidates[annIndex];
      if (currCandidate.resource_candidates) {
        let resource_candidate = currCandidate.resource_candidates[index];
        if (resource_candidate.selected !== true) {
          resource_candidate.selected = true;
        } else {
          resource_candidate.selected = false;
        }

        currCandidate.resource_candidates.splice(index, 1, { ...resource_candidate });
        annotationCandidates.splice(annIndex, 1, { ...currCandidate });
        this.setState({ annotationCandidates });
      }
    }
  }

  setStep = (step) => {
    this.setState({ step });
  }

  render() {
    const {
      idea
    } = this.state
    const sessionId = this.props.match.params.session_id
    const { session } = this.props
    let showTimerModal = false;

    if (session[sessionId] !== undefined && session[sessionId].ready) {
      showTimerModal = session[sessionId].timer === 0;
      const { currentCandidate, annotationCandidates, step, idea } = this.state;
      // const onSubmit = this.state.step !== 'submit' ? (this.state.step === 'cvalidate' ? this.candidateValidate : this.validate) : this.onSubmitIdea;
      const onSubmit = this.state.step === 'submit' ? this.onSubmitIdea : this.validate;
      const submitButtonLabel = this.state.step === '' ? 'Validate or press Enter' : 'Submit';
      const currentSession = session[sessionId]
      this.state.inspirations = currentSession.inspirations
      const {
        config
      } = currentSession.challengeInfo
      const {
        challengeDescription,
        taskDescription
      } = config
      const { ideas, timer } = currentSession;
      const inspirations = currentSession.inspirations;
      let disableValidate = true;
      let validationPanel = null;
      if (currentCandidate !== null) {
        if (annotationCandidates !== null) {
          const candidateData = annotationCandidates.find(candidate => candidate.offset === currentCandidate.offset && candidate.text === currentCandidate.text);
          if (candidateData) {
            validationPanel = candidateData.resource_candidates.map((candidate, index) => {
              if (candidate.selected) {
                disableValidate = false;
              }
              return (
                <div className={`sidepanel-inner-row ${candidate.selected !== true ? '' : 'selected'}`} key={index} onClick={() => this.onSelectCandidate(index)}>
                  <img src={candidate.thumbnail} width="100"/>
                  <p>{candidate.description}</p>
                </div>
              )});
          }
        }
      }

      let highlightedText = null;
      if (step === 'submit' || step === 'cvalidate') {
        highlightedText = this.getHighlightedText(idea.value, annotationCandidates ? annotationCandidates : []);
      }

      let ideasMapComponent = (
        <div className="resrow resrow-border">
          <div className="blank-solid"></div>
        </div>
      )
      if (ideas.length > 0) {
        ideasMapComponent = ideas.map((ideaText, index) => (
          <div className="resrow" key={index}>
            <p>{ideaText}</p>
          </div>
        ))
      }
      return (
        <React.Fragment>
          <div className="navbar-brand" style={{float: 'none'}}><img src={i2mLogoDark} /></div>
          <div className="container session-start-page">
            <div className="col-md-8 center-block">
              <div className="row clearfix preview-area">
                <p className="small-warning">
                  <span>{taskDescription}</span>
                  <span style={{ fontWeight: '500', display: 'block'}}>
                    <i className="glyphicon glyphicon-info-sign"></i>
                    &nbsp; If you have any issues with the system, try refreshing the page - it will maintain your ideas and the timer in the same place as before.
                  </span>
                </p>
                <h3 className="title">Challenge</h3>
                <div className="timer-flick">
                  <p className="challange-txt">{challengeDescription.length > 0 ? challengeDescription : '-'}</p>
                  <div className="timer-div">{this.secondsToTimeString(timer)}</div>
                </div>
                <h3 className="title">Submit a new Idea</h3>
                <div className="validation">
                  { (step === 'submit' || step === 'cvalidate') &&
                    highlightedText
                  }
                  { (step !== 'submit' && step !== 'cvalidate') &&
                    <textarea
                      className="prev-control"
                      value={idea.value}
                      onChange={this.onIdeaTextChange}
                      disabled={timer === 0}
                      onKeyDown={this.onEnterPress}
                    />
                  }
                  <div className="btn-container relative">
                    <button className="reset" onClick={this.onResetIdeaField}>Reset</button>
                      <button className="submit" onClick={onSubmit} disabled={this.state.idea.value.length < 3 || (!this.state.submittable && this.state.step !== '') }>{submitButtonLabel}</button>
                      <Loader2 loading={this.props.util.loading2} />
                  </div>
                  <div className="valid-sidepanel">
                    <h3 className="title">Validation</h3>
                    { validationPanel !== null &&
                      <div style={{ marginBottom: '10px' }}>
                        <button className="btn validate-button" onClick={() => this.candidateValidate()} disabled={disableValidate}>Validate</button>
                        <button className="btn nothing-fits-button" onClick={() => this.candidateValidate(true)}>Nothing Fit's</button>
                      </div>
                    }
                    <div className="sidepanel-inner">
                      {validationPanel}
                    </div>                    
                  </div>
                </div>
                { inspirations.length > 0 &&
                  this.displayInspiration()
                }
                { 
                  inspirations.length > 0  &&
                  <div style={{textAlign: 'center'}}>
                    <button className="inspire-me-button" onClick={ this.inspireMe } >Inspire me</button>
                  </div>
                }

                <h3 className="title">Your Ideas</h3>
                <div className="idea-contain">{ideasMapComponent}</div>
                {/* <div>
                  <button
                    className="submit-session-btn"
                    onClick={this.onSubmitSession}
                  >
                    Submit Session
                  </button>
                </div> */}
              </div>

              <div className="blank-div" />
            </div>
          </div>
          {/* { showTimerModal && <TimeUpModal link={ this.props.location.pathname.replace('start', 'end') } /> } */}
          { showTimerModal && <TimeUpModal onSubmitSession={ this.onSubmitSession } /> }
          <Toastify/>
        </React.Fragment>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return {
    session: state.session,
    util: state.util
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addEventRequest, addIdeaRequest, submitSessionRequest, sessionRequest, tickTimer, toggleLoader2 }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionScreen))

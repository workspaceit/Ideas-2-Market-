import { push } from 'connected-react-router'
import jwt from 'jsonwebtoken'
import { authenticateIdeator } from "./auth";
import apiEndpoint from '../utils/api'
import { loadInspirations } from './challenges'
import { showLoader, hideLoader, showLoader2, hideLoader2 } from './util'


export const GOT_SESSION_ID = 'GOT_SESSION_ID'
export const SESSION_VALIDITY = 'SESSION_VALIDITY'
export const IDEATOR_ATTEMPTED = 'IDEATOR_ATTEMPTED'
export const IDEATOR_ERROR = 'IDEATOR_ERROR'
export const IDEATOR_SUCCESS = 'IDEATOR_SUCCESS'
export const SESSION_CHALLENGE_SUCCESS = 'SESSION_CHALLENGE_SUCCESS'
export const ADD_IDEA = 'ADD_IDEA'
export const SET_SUBSCRIPTION_FORM_DATA = 'SET_SUBSCRIPTION_FORM_DATA'
export const LOADED_INSPIRATIONS = 'LOADED_INSPIRATIONS'
export const SESSION_READY = 'SESSION_READY'
export const SESSION_STARTED = 'SESSION_STARTED'
export const START_TIMER = 'START_TIMER'
export const STOP_TIMER = 'STOP_TIMER'
export const TICK_TIMER = 'TICK_TIMER'
export const CLEAR_SESSION = 'CLEAR_SESSION';
export const ADD_EVENT = 'ADD_EVENT';

const addEvent = (challengeId, eventType, eventTime) => ({ type: ADD_EVENT, challengeId, eventTime, eventType });
const gotSessionId = (sessionId) => ({ type: GOT_SESSION_ID, sessionId })
const sessionValidity = (isValid) => ({ type: SESSION_VALIDITY, isValid })
const ideatorAttempted = () => ({ type: IDEATOR_ATTEMPTED })
const ideatorError = (errorMessage) => ({ type: IDEATOR_ERROR, errorMessage })
const ideatorSuccess = (challengeId, ideatorInfo) => ({ type: IDEATOR_SUCCESS, ideatorInfo, challengeId })
const sessionChallengeSuccess = (challengeId, challengeInfo) => ({ type: SESSION_CHALLENGE_SUCCESS, challengeInfo, challengeId })
const addIdea = (challengeId, ideaText) => ({ type: ADD_IDEA, ideaText, challengeId })
const loadedInspirations = (challengeId, inspirations) => ({ type: LOADED_INSPIRATIONS, inspirations, challengeId });
const sessionReady = (challengeId) => ({ type: SESSION_READY, challengeId });
const clearSession = (challengeId) => ({ type: CLEAR_SESSION, challengeId });
export function sessionStarted(challengeId) {
  return dispatch => {
    dispatch({ type: SESSION_STARTED, challengeId });
    dispatch(push(`/session/${challengeId}/start`));
  };
};
// export const setSubscriptionFormData = (formData) => ({ type: SET_SUBSCRIPTION_FORM_DATA, formData })

export function submitSessionRequest(challengeId, { startTime }) {
  return (dispatch, getState) => {
    const state = getState()
    const session = state.session[challengeId]
    const { token } = session.ideatorInfo
    const { s: sessionId } = jwt.decode(token)
    const headers = {
      authorization: `Bearer ${token}`
    }

    const sessionData = {
      startTime,
      endTime: new Date().toISOString(),
      lastActive: null,
      state: "submitted",
      events: session.events
    }
    apiEndpoint.patch(`/api/ideationSessions/${sessionId}`, sessionData, { headers })
      .then(() => {
        // state.session.ideas.forEach((idea, index) => {
        //   const ideaData = {
        //     content: idea,
        //     created: session.events[index],
        //     state: 'unreviewed',
        //     challengeId,
        //     creatorId: ideatorId,
        //     ideationSessionId: sessionId
        //   }
        //   apiEndpoint.post('/api/ideas', ideaData, { headers })
        //     .then(res => {
        //       console.log(res)
        //     })
        //     .catch(error => {
        //       console.log(error)
        //     })
        // })
        dispatch(push(`/session/${challengeId}/end`))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

function getIcvResult(annotationCandidates) {
  return {
    annotations: annotationCandidates.map(candidate => {
      const { text, offset, resource_candidates } = candidate;
      const rcandidates = resource_candidates.map(rcandidate => {
        const { offset, resource, source, text, selected } = rcandidate;
        
        return { offset, resource, source, text, selected: selected !== true ? false : true };
      });

      return { text, offset, resourceCandidates: rcandidates };
    })
  };
}

export function addIdeaRequest(_challengeId, ideaText, eventTime, annotationCandidates) {
  return (dispatch, getState) => {
    // dispatch(addIdea(ideaText, eventTime))
    const state = getState();
    const currentSession = state.session[_challengeId];
    if (currentSession) {
      const { ideatorInfo } = currentSession;
      const { sub: ideatorId, c: challengeId, s: sessionId } = jwt.decode(ideatorInfo.token);
      const headers = {
        authorization: `Bearer ${ideatorInfo.token}`
      }
      const ideaData = {
        content: ideaText,
        created: eventTime,
        state: 'unreviewed',
        challengeId,
        creatorId: ideatorId,
        ideationSessionId: sessionId,
        icvResult: getIcvResult(annotationCandidates)
      };
      dispatch(showLoader2())
      apiEndpoint.post('/api/ideas', ideaData, { headers })
        .then(response => {
          dispatch(addIdea(_challengeId, ideaText));
          dispatch(hideLoader2())
          state.util.notify('info', 'Idea submitted')
        })
        .catch(error => {
          dispatch(hideLoader2())
          state.util.notify('error', 'Idea submition failed')
          console.log(error);          
        });
    }
  }
}

export function checkValidSession(challengeId) {
  return (dispatch, getState) => {
    dispatch(gotSessionId(challengeId))

    apiEndpoint.post('/create-session', { challengeId })
      .then(response => {
        const ideatorInfo = response.data
        const { token } = ideatorInfo
        const { sub: ideatorId, s: sessionId } = jwt.decode(token)
        ideatorInfo.ideatorId = ideatorId
        ideatorInfo.sessionId = sessionId
        dispatch(ideatorSuccess(ideatorInfo))
        const headers = {
          authorization: `Bearer ${token}`
        }
        apiEndpoint.get(`/api/challenges/${challengeId}`, { headers })
          .then(response => {
            const challengeInfo = response.data
            const { config } = challengeInfo
            dispatch(sessionChallengeSuccess(challengeInfo))
            loadInspirations(config ? config._links : config, headers)
              .then(result => {
                dispatch(loadedInspirations(result))
              })
              .catch(error => {
                console.log(error)
              })
          })
          .catch(error => {
            dispatch(sessionValidity(false))
            dispatch(push('/api/challenges'))
          })
      })
      .catch(error => {
        console.log(error)
        dispatch(push('/api/challenges'))
      })
  }
}

export function setSubscriptionFormData (challengeId, formData){  
  return (dispatch, getState) => {
    dispatch(showLoader())
    const state = getState();
    const profileData = {
      age: formData.age.value,
      gender: formData.gender.value,
      nationality: formData.nationality.value,
      highestDegree: formData.highestDegree.value,
      highestDegreeOther: formData.highestDegreeOther.value,
      occupation: formData.occupation.value,
      displayName: formData.firstName.value
    }
    const headers = {
      authorization: `Bearer ${state.session[challengeId].ideatorInfo.token}`
    }
    const ideatorId = state.session[challengeId].ideatorInfo.ideatorId
    // console.log(profileData, headers)
    apiEndpoint.patch(`/api/ideators/${ideatorId}`, profileData, { headers })
      .then(response => {
        dispatch(hideLoader())
        dispatch(push('/thankyou'))
      })
      .catch(error => {
        dispatch(hideLoader())
        console.log(error)
      })
      .finally(() => {
        dispatch(clearSession(challengeId));
      });
  }
}

export function sessionInit(challengeId, redirect=false) {
  return (dispatch, getState) => {
    // init ideator session, then load the challenge, see if valid
    apiEndpoint.post('/create-session', { challengeId })
      .then(response => {
        let ideatorInfo = response.data
        const { token } = ideatorInfo
        const { sub: ideatorId, s: sessionId, exp } = jwt.decode(token)
        ideatorInfo.ideatorId = ideatorId
        ideatorInfo.sessionId = sessionId
        ideatorInfo.Expiration = exp
        dispatch(ideatorSuccess(challengeId, ideatorInfo))
        const headers = {
          authorization: `Bearer ${token}`
        }
        apiEndpoint.get(`/api/challenges/${challengeId}`, { headers })
          .then(response => {
            const challengeInfo = response.data
            const { config } = challengeInfo
            dispatch(sessionChallengeSuccess(challengeId, challengeInfo))
            loadInspirations(config ? config._links : config, headers)
              .then(result => {
                dispatch(loadedInspirations(challengeId, result))
                dispatch(sessionReady(challengeId));
                if (redirect) {
                  dispatch(push(`/session/${challengeId}`));
                }
              })
              .catch(error => {
                console.log(error)
              })
          })
          .catch(error => {
            dispatch(sessionValidity(false))
            dispatch(push('/api/challenges'))
          });
      })
      .catch(error => {
        console.log(error)
        dispatch(push('/api/challenges'))
      });
  };
}

export function tickTimer(challengeId) {
  return (dispatch, getState) => {
    const state = getState();
    const session = state.session[challengeId];
    if (session && session.timer > 0) {
      dispatch({ type: TICK_TIMER, challengeId });
    } else {
      dispatch({ type: STOP_TIMER, challengeId });
    }
  };
}

export function sessionRequest(eventName, challengeId) {
  return (dispatch, getState) => {
    const state = getState();
    console.log(eventName);

    switch (eventName) {
      case 'welcome':
      if (state.session[challengeId] !== undefined) {
        if (state.session[challengeId].started) {
          console.log('redirect to start');
          dispatch(push(`/session/${challengeId}/start/`));
        } else {
          // dispatch();
          // dispatch(push(`/session/${challengeId}/start/`));
        }
      } else {
        dispatch(sessionInit(challengeId));
      }
      break;

      case 'start':
      if (state.session[challengeId] === undefined) {
        dispatch(sessionInit(challengeId, true));
      } else if (!state.session[challengeId].started) {
        dispatch(push(`/session/${challengeId}`));
      } else {
        console.log('started');
        // dispatch(push(`/session/${challengeId}/start`));
      }
      break;

      default:
      return;
    }
  };
}

export function addEventRequest(challengeId, eventType) {
  return (dispatch, getState) => {
    const state = getState();
    const eventTime = Math.abs(state.session[challengeId].challengeInfo.config.timePerSessionInMs - state.session[challengeId].timer);
    dispatch(addEvent(challengeId, eventType, eventTime));
  };
}

import axios from 'axios'
import { push } from 'connected-react-router'
import apiEndpoint from '../utils/api'
import { getSeconds, getMinuteStringFromSeconds, getSecondStringFromSeconds } from '../utils/time'
import { getIdFromUrl } from '../utils/parse'
import { showLoader, hideLoader } from './util'


export const CHANGED_FORM_DATA = 'CHANGED_FORM_DATA'
export const CHANGED_SINGLE_FORM_DATA = 'CHANGED_SINGLE_FORM_DATA'
export const LOAD_CHALLENGES_ATTEMPTED = 'LOAD_CHALLENGES_ATTEMPTED'
export const LOAD_CHALLENGES_ERROR = 'LOAD_CHALLENGES_ERROR'
export const LOAD_CHALLENGES_SUCCESS = 'LOAD_CHALLENGES_SUCCESS'
export const LOAD_CHALLENGE_ATTEMPTED = 'LOAD_CHALLENGE_ATTEMPTED'
export const LOAD_CHALLENGE_ERROR = 'LOAD_CHALLENGE_ERROR'
export const LOAD_CHALLENGE_SUCCESS = 'LOAD_CHALLENGE_SUCCESS'
export const PUBLISH_CHALLENGE_ATTEMPTED = 'PUBLISH_CHALLENGE_ATTEMPTED'
export const PUBLISH_CHALLENGE_ERROR = 'PUBLISH_CHALLENGE_ERROR'
export const PUBLISH_CHALLENGE_SUCCESS = 'PUBLISH_CHALLENGE_SUCCESS'
export const SUBMIT_CHALLENGE_ATTEMPTED = 'SUBMIT_CHALLENGE_ATTEMPTED'
export const SUBMIT_CHALLENGE_ERROR = 'SUBMIT_CHALLENGE_ERROR'
export const SUBMIT_CHALLENGE_SUCCESS = 'SUBMIT_CHALLENGE_SUCCESS'
export const LOAD_IDEAS_FOR_CHALLENGE = 'LOAD_IDEAS_FOR_CHALLENGE'
export const LOAD_SESSIONS_FOR_CHALLENGE = 'LOAD_SESSIONS_FOR_CHALLENGE'
export const FORM_DATA_VALIDATE = 'FORM_DATA_VALIDATE'
export const FORM_DATA_INVALIDATE = 'FORM_DATA_INVALIDATE'
export const SINGLE_FORM_DATA_VALIDATE = 'SINGLE_FORM_DATA_VALIDATE'
export const SINGLE_FORM_DATA_INVALIDATE = 'SINGLE_FORM_DATA_INVALIDATE'

const changeFormData = (formData) => ({ type: CHANGED_FORM_DATA, formData})
const changeSingleFormData = (formData) => ({ type: CHANGED_SINGLE_FORM_DATA, formData})
const loadChallengeAttempted = () => ({ type: LOAD_CHALLENGE_ATTEMPTED })
const loadChallengeError = (errorMessage) => ({ type: LOAD_CHALLENGE_ERROR, errorMessage })
const loadChallengeSuccess = (formData, originalResponse) => ({ type: LOAD_CHALLENGE_SUCCESS, formData, originalResponse })
const loadChallengesAttempted = () => ({ type: LOAD_CHALLENGES_ATTEMPTED })
const loadChallengesError = (errorMessage) => ({ type: LOAD_CHALLENGES_ERROR, errorMessage })
const loadChallengesSuccess = (challenges) => ({ type: LOAD_CHALLENGES_SUCCESS, challenges })
const publishChallengeAttempted = () => ({ type: PUBLISH_CHALLENGE_ATTEMPTED })
const publishChallengeError = () => ({ type: PUBLISH_CHALLENGE_ERROR })
const publishChallengeSuccess = () => ({ type: PUBLISH_CHALLENGE_SUCCESS })
const submitChallengeAttempted = () => ({ type: SUBMIT_CHALLENGE_ATTEMPTED })
const submitChallengeError = (errorMessage) => ({ type: SUBMIT_CHALLENGE_ERROR, errorMessage })
const submitChallengeSuccess = () => ({ type: SUBMIT_CHALLENGE_SUCCESS })
const loadedIdeasForChallenge = (ideas) => ({ type: LOAD_IDEAS_FOR_CHALLENGE, ideas })
const loadedSessionsForChallenge = (sessions) => ({ type: LOAD_SESSIONS_FOR_CHALLENGE, sessions })
const formDataInvalidate = (error) => ({ type: FORM_DATA_INVALIDATE, error });
const formDataValidate = () => ({ type: FORM_DATA_VALIDATE });
const singleFormDataInvalidate = (error) => ({ type: SINGLE_FORM_DATA_INVALIDATE, error });
const singleFormDataValidate = () => ({ type: SINGLE_FORM_DATA_VALIDATE });

export function loadInspirations(inspirations, headers) {
  if (inspirations && inspirations.inspirations) {
    inspirations = inspirations.inspirations
    if (inspirations.length === undefined) {
      inspirations = [inspirations]
    }
  } else {
    inspirations = []
  }
  let inspirationPromises = []
  for(let i=0; i<inspirations.length; i++) {
    inspirationPromises.push(new Promise((resolve, reject) => {
      axios.get(inspirations[i].href, { headers })
        .then(response => {
          const inspirationData = {
            methodicalDescription: response.data.methodicalDescription,
            inspirationText: response.data.text,
            inspirationImageData: response.data.image,
            inspirationLink: inspirations[i].href
          }
          resolve(inspirationData)
        })
        .catch(error => {
          reject(null)
        })
    }))
  }

  return new Promise((resolve, reject) => {
    Promise.all(inspirationPromises)
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function loadSessionsForChallenge(challengeId) {
  return (dispatch, getState) => {
    const state = getState()
    const { token } = state.auth.userInfo
    const authorizationString = `Bearer ${token}`
    const headers = {
      authorization: authorizationString
    }

    apiEndpoint.get(`/api/ideationSessions/search/findByChallengeId?challengeId=${challengeId}`, { headers })
      .then(response => {
        const sessions = response.data._embedded.ideationSessions
        attachIdeasWithSessions(sessions, headers)
          .then(result => {
            dispatch(loadedSessionsForChallenge(result))
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }
}

export function loadChallengeRequest(challengeLink, withIdeas=false) {
  return (dispatch, getState) => {
    dispatch(showLoader())
    const challengeId = getIdFromUrl(challengeLink)

    dispatch(loadChallengeAttempted())
    dispatch(changeSingleFormData(null))

    const state = getState()
    const { token } = state.auth.userInfo
    const authorizationString = `Bearer ${token}`
    const headers = {
      authorization: authorizationString
    }

    apiEndpoint.get(`/api/challenges/${challengeId}`, { headers })
      .then(response => {
        const { data } = response
        const { config } = data
        loadInspirations(config ? config._links : config, headers)
          .then(result => {
            const formData = {
              seconds: config && config.timePerSessionInMs ? getSecondStringFromSeconds(config.timePerSessionInMs) : '',
              minutes: config && config.timePerSessionInMs ? getMinuteStringFromSeconds(config.timePerSessionInMs): '',
              challengeDescription: config ? config.challengeDescription : '',
              taskDescription: config ? config.taskDescription : '',
              methodicalDescription: '',
              inspirationText: '',
              inspirationImageData: '',
              inspirations: result,
              title: data.title
            }
            const originalResponse = response.data

            dispatch(loadChallengeSuccess(formData, originalResponse))
            
            if (withIdeas) {
              dispatch(loadIdeasForChallenge(challengeId))
              dispatch(loadSessionsForChallenge(challengeId))
              dispatch(hideLoader())
              dispatch(push(`/challenges/${challengeId}/view`))
            } else {
              dispatch(hideLoader())
              dispatch(push(`/challenges/${challengeId}/edit`))
            }
          })
          .catch(error => {
            console.log(error)
            dispatch(loadChallengeError('Error occurred'))
            dispatch(hideLoader())
            dispatch(push('/challenges'))
          })
      })
      .catch(error => {
        console.log(error)
        dispatch(loadChallengeError('Error occurred'))
        dispatch(hideLoader())
        dispatch(push('/challenges'))
      })
  }
}

function loadIdeasForChallenge(challengeId) {
  return (dispatch, getState) => {
    const state = getState()
    const { token } = state.auth.userInfo
    const authorizationString = `Bearer ${token}`
    const headers = {
      authorization: authorizationString
    }

    apiEndpoint.get(`/api/ideas/search/findByChallengeId?challengeId=${challengeId}`, { headers })
      .then(response => dispatch(loadedIdeasForChallenge(response.data._embedded.ideas)))
      .catch(error => console.log(error))
  };
}

function attachIdeasWithSessions(ideationSessions, headers) {
  let sessionPromises = [];

  for(let i=0; i<ideationSessions.length; i++) {
    sessionPromises.push(new Promise((resolve, reject) => {
      const sessionId = getIdFromUrl(ideationSessions[i]._links.self.href)
      apiEndpoint.get(`/api/ideas/search/findByIdeationSessionId?ideationSessionId=${sessionId}`, { headers })
        .then(response => {
          ideationSessions[i].ideas = response.data._embedded.ideas
          resolve()
        })
        .catch(error => reject(error))
    }))
  }

  return new Promise((resolve, reject) => {
    Promise.all(sessionPromises)
      .then(result => {
        resolve(ideationSessions)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function loadChallengesRequest() {
  return (dispatch, getState) => {
    dispatch(showLoader())
    dispatch(loadChallengesAttempted())

    const state = getState()
    const { token } = state.auth.userInfo
    const authorizationString = `Bearer ${token}`
    const headers = {
      authorization: authorizationString
    }

    apiEndpoint.get('/api/challenges', { headers })
      .then(response => {
        const { challenges } = response.data._embedded

        dispatch(loadChallengesSuccess(challenges))
        dispatch(hideLoader())
      })
      .catch(error => {
        dispatch(hideLoader())
        dispatch(loadChallengesError('Error occurred'))
      })
  }
}

export function publishChallengeRequest(challengeLink) {
  return (dispatch, getState) => {
    dispatch(showLoader())
    dispatch(publishChallengeAttempted())
    const state = getState()
    const { token } = state.auth.userInfo
    const authorizationString = `Bearer ${token}`
    const headers = {
      authorization: authorizationString
    }
    const challengeId = getIdFromUrl(challengeLink)
    const challengeData = {
      state: 'published',
      published: new Date().toISOString()
    }
    apiEndpoint.patch(`/api/challenges/${challengeId}`, challengeData, { headers })
      .then(response => {
        state.util.notify('info', 'Successfully published')
        console.log(response)
        dispatch(loadChallengesRequest())
        dispatch(publishChallengeSuccess())
        dispatch(push('/challenges'))
      })
      .catch(error => {
        state.util.notify('warn', 'Failed to publish')
        console.log(error)
        dispatch(publishChallengeError())
        dispatch(hideLoader())
      })
  }
}

function submitInspirations(inspirations, headers) {
  let inspirationPromises = []
  for (let i=0; i<inspirations.length; i++) {
    inspirationPromises.push(new Promise((resolve, reject) => {
      if (inspirations[i].inspirationLink === undefined) {
        const inspirationData = {
          methodicalDescription: inspirations[i].methodicalDescription,
          text: inspirations[i].inspirationText,
          image: null
        }
        apiEndpoint.post('/api/inspirations', inspirationData, { headers })
          .then(response => {
            if (inspirations[i].inspirationImageData) {
              const imageData = {
                inspirationId: getIdFromUrl(response.data._links.self.href),
                data: inspirations[i].inspirationImageData
              }
              apiEndpoint.post('/api/images/', imageData, {headers})
                .then(response => {
                  apiEndpoint.put(`/api/inspirations/${imageData.inspirationId}`, { ...inspirationData, image: response.data }, {headers})
                    .then(response => { resolve(response.data._links.self.href) })
                    .catch(error => { console.log(error) })
                })
                .catch(error => { console.log(error) })
            } else {
              resolve(response.data._links.self.href)
            }
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      } else {
        resolve(inspirations[i].inspirationLink)
      }
    }))
  }
  return new Promise((resolve, reject) => {
    Promise.all(inspirationPromises)
      .then(result => {
        console.log(result)
        resolve(result)
      })
      .catch(error => reject(error))
    }
  )
}

export function submitChallengeRequest(single=false, challengeId) {
  return (dispatch, getState) => {
    dispatch(showLoader())
    const state = getState()
    let formData = state.challenges.formData
    let methodName = 'post'
    if (single) {
      formData = state.challenges.single.formData
      methodName = 'put'
    }
    const {
      challengeDescription,
      minutes,
      seconds,
      taskDescription,
      title
    } = formData

    const currentISODateTime = new Date().toISOString()
    const { token } = state.auth.userInfo
    const authorizationString = `Bearer ${token}`
    const headers = {
      authorization: authorizationString
    }
    let challengeData = {
      state: 'draft',
      title,
      created: currentISODateTime,
      lastModified: currentISODateTime,
      config: {
        timePerSessionInMs: getSeconds({ minutes, seconds }),
        taskDescription,
        challengeDescription
      },
      numberIdeas: 0,
      numberSessions: 0
    }
    if (single) {
      challengeData['state'] = state.challenges.single.originalResponse.state
      challengeData['created'] = state.challenges.single.originalResponse.created
      challengeData['numberIdeas'] = state.challenges.single.originalResponse.numberIdeas
      challengeData['numberSessions'] = state.challenges.single.originalResponse.numberSessions
    }

    dispatch(submitChallengeAttempted())
    const formDataRoot = single ? state.challenges.single : state.challenges
    submitInspirations(formDataRoot.formData.inspirations, headers)
      .then(result => {
        challengeData.config.inspirations = result
        apiEndpoint[methodName](`/api/challenges/${single ? challengeId: ''}`, challengeData, { headers })
          .then(response => {
            console.log(response)
            dispatch(submitChallengeSuccess())
            state.util.notify('info', 'Successfully created')
            dispatch(push('/challenges'))
          })
          .catch((error) => {
            console.log(error)
            state.util.notify('warn', 'Failed to created')
            dispatch(submitChallengeError())
            dispatch(hideLoader())
          })
      })
      .catch(error => {
        dispatch(hideLoader())
        console.log(error)
      })
  }
}

export function changeFormDataRequest(formData, init=false) {
  return (dispatch, getState) => {
    dispatch(changeFormData(formData))
    const state = getState()
    const {
      challengeDescription,
      minutes,
      seconds,
      taskDescription,
      title
    } = state.challenges.formData
    if (title === null || title.length < 1) {
      dispatch(formDataInvalidate('Challenge Title is missing.'));
    } else if (challengeDescription === null || challengeDescription.length < 1) {
      // dispatch(submitChallengeError("Challenge Description and Task Description must be provided."))
      dispatch(formDataInvalidate('Challenge Description is missing.'));
    } else if (taskDescription === null || taskDescription.length < 1) {
      dispatch(formDataInvalidate('Task Description is missing.'));
    } else if ((minutes === null || minutes.length < 1) && (seconds === null || seconds.length < 1)) {
      dispatch(formDataInvalidate('Time is missing.'));
    } else {
      dispatch(formDataValidate());
      // dispatch(submitChallengeError(null))
    }
  }
}

export function changeSingleFormDataRequest(formData) {
  return (dispatch, getState) => {
    dispatch(changeSingleFormData(formData))
    const state = getState()
    const {
      challengeDescription,
      minutes,
      seconds,
      taskDescription,
      title
    } = state.challenges.single.formData
    if (title === null || title.length < 1) {
      dispatch(singleFormDataInvalidate('Challenge Title is missing.'));
    } else if (challengeDescription === null || challengeDescription.length < 1) {
      // dispatch(submitChallengeError("Challenge Description and Task Description must be provided."))
      dispatch(singleFormDataInvalidate('Challenge Description is missing.'));
    } else if (taskDescription === null || taskDescription.length < 1) {
      dispatch(singleFormDataInvalidate('Task Description is missing.'));
    } else if ((minutes === null || minutes.length < 1) && (seconds === null || seconds.length < 1)) {
      dispatch(singleFormDataInvalidate('Time is missing.'));
    } else {
      dispatch(singleFormDataValidate());
      // dispatch(submitChallengeError(null))
    }

    console.log(getState());
  }
}

function changeIdeasState(ideaLinks, state, headers) {
  let ideaPromises = []
  for(let i=0; i<ideaLinks.length; i++) {
    ideaPromises.push(new Promise((resolve, reject) => {
      apiEndpoint.patch(ideaLinks[i], { state }, { headers })
        .then(response => resolve(response))
        .catch(error => reject(error))
    }))
  }

  return new Promise((resolve, reject) => {
    Promise.all(ideaPromises)
      .then(() => resolve())
      .catch(error => reject(error))
  })
}

export function approveOrRejectIdeas(action, selectedIdeas) {
  return (dispatch, getState) => {
    dispatch(showLoader())
    const state = getState()
    const { token } = state.auth.userInfo
    const authorizationString = `Bearer ${token}`
    const headers = {
      authorization: authorizationString
    }
    const notif_msg = action === 'approved' ? 'Successfully approved' : 'Successfully rejected'
    changeIdeasState(selectedIdeas, action, headers)
      .then(() => {
        dispatch(loadChallengeRequest(state.challenges.single.originalResponse._links.self.href, true))
        dispatch(hideLoader())
        state.util.notify('info', notif_msg)
      })
      .catch(error => {
        console.log(error)
        dispatch(hideLoader())
        state.util.notify('warn', 'Operation failed')
      })
  }
}


export function exportChallengeIdea() {
  return (dispatch, getState) => {
    dispatch(showLoader())
    const state = getState()
    const { token } = state.auth.userInfo
    const authorizationString = `Bearer ${token}`
    const challengeId = getIdFromUrl(state.challenges.single.originalResponse._links.self.href)
    const req_config = {
      url: `/api/export/challenge/${challengeId}`,
      method: 'GET',
      responseType: 'blob',
      headers: {
        authorization: authorizationString
      }
    }
    apiEndpoint(req_config)
      .then((response) => {
        let aTag = document.createElement("a");
        document.body.appendChild(aTag);
        aTag.style = "display: none";
        const url = window.URL.createObjectURL(response.data);
        aTag.href = url;
        aTag.download = `ideas-${challengeId}.json`;
        aTag.click();
        window.URL.revokeObjectURL(url);
        dispatch(hideLoader())
      })
      .catch(error => {
        console.log(error)
        dispatch(hideLoader())
      })
  }
}
import { push } from 'connected-react-router'
import apiEndpoint from '../utils/api'
import { userInfo as mockUserInfo } from '../utils/mockData'
import { showLoader, hideLoader } from './util'


const headers = {
  'content-type': 'application/json'
}

export const BOOT_ATTEMPTED = 'BOOT_ATTEMPTED'
export const BOOT_DONE = 'BOOT_DONE'
export const INFO_ATTEMPTED = 'LOGIN_ATTEMPTED'
export const INFO_ERROR = 'LOGIN_ERROR'
export const INFO_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ATTEMPTED = 'LOGIN_ATTEMPTED'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

const bootAttempted = () => ({ type: BOOT_ATTEMPTED })
const bootDone = (userInfo) => ({ type: BOOT_DONE, userInfo })
const infoAttempted = () => ({ type: INFO_ATTEMPTED })
// const infoError = (errorMessage) => ({ type: INFO_ERROR, errorMessage })
// const infoSuccess = (userInfo) => ({ type: INFO_SUCCESS, userInfo })
const loginAttempted = () => ({ type: LOGIN_ATTEMPTED })
const loginError = (errorMessage) => ({ type: LOGIN_ERROR, errorMessage })
const loginSuccess = (userInfo) => ({ type: LOGIN_SUCCESS, userInfo })

export function checkLogin() {
  return dispatch => {
    dispatch(bootAttempted())

    let rawUserInfo = localStorage.getItem('i2mUserInfo')
    if (rawUserInfo) {
      let userInfo = JSON.parse(rawUserInfo)
      dispatch(bootDone(userInfo))
      dispatch(push('/challenges'))
    } else {
      dispatch(bootDone(null))
    }
  }
}

export function loadUserInfo() {
  return (dispatch, getState) => {
    dispatch(infoAttempted())

    const state = getState()
    const finalHeaders = {
      ...headers,
      Authorization: `Bearer ${state.auth.userInfo}`
    }
    apiEndpoint.get('/user', { headers: finalHeaders })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.response)
      })
  }
}

export function loginRequest(email, password) {
  return dispatch => {
    dispatch(showLoader())
    dispatch(loginAttempted())

    const payload = {
      username: email,
      password: password
    }
    apiEndpoint.post('/auth', payload, { headers })
      .then(response => {
        let userInfo = response.data
        const headers = {
          authorization: `Bearer ${userInfo.token}`
        }

        apiEndpoint.get('/user', { headers })
          .then(response => {
            userInfo = { ...userInfo, ...mockUserInfo }
          })
          .catch(error => {
            console.log(error.response)
          })
          .finally(() => {
            let rawUserInfo = JSON.stringify(userInfo)

            // save token to localStorage
            localStorage.setItem('i2mUserInfo', rawUserInfo)

            dispatch(loginSuccess(userInfo))
            dispatch(hideLoader())
            dispatch(push('/challenges'))
          })
      })
      .catch(error => {
        const errorResponse = error.response
        let errorMessage = 'Could not login. Please try again later!'
        if (errorResponse) {
          errorMessage = errorResponse.data
        }

        dispatch(loginError(errorMessage))
        dispatch(hideLoader())
      })
  }
}

export function logoutRequest() {
  return dispatch => {
    localStorage.removeItem('i2mUserInfo')
    dispatch(push('/login'))
  }
}

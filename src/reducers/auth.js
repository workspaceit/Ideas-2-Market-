import {
  BOOT_ATTEMPTED,
  BOOT_DONE,
  INFO_ATTEMPTED,
  INFO_ERROR,
  INFO_SUCCESS,
  LOGIN_ATTEMPTED,
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from '../actions/auth'


const INITIAL_STATE = {
  boot: {
    attempted: false,
    done: false
  },
  login: {
    attempted: false,
    errorMessage: null
  },
  userInfo: null,
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
  case BOOT_ATTEMPTED:
    return {
      ...state,
      boot: {
        attempted: true
      }
    }
  case BOOT_DONE:
    return {
      ...state,
      boot: {
        attempted: false,
        done: true
      },
      userInfo: action.userInfo
    }
  case INFO_SUCCESS:
    return {
      ...state,
      userInfo: { ...state.userInfo, ...action.userInfo }
    }
  case LOGIN_ATTEMPTED:
    return {
      ...state,
      login: {
        attempted: true,
        errorMessage: null
      }
    }
  case LOGIN_ERROR:
    return {
      ...state,
      login: {
        attempted: false,
        errorMessage: action.errorMessage
      }
    }
  case LOGIN_SUCCESS:
    return {
      ...state,
      userInfo: action.userInfo,
      login: {
        attempted: false,
        errorMessage: null
      }
    }
  default:
    return state
  }
}

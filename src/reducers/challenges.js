import {
  CHANGED_FORM_DATA,
  CHANGED_SINGLE_FORM_DATA,
  LOAD_CHALLENGES_ATTEMPTED,
  LOAD_CHALLENGES_ERROR,
  LOAD_CHALLENGES_SUCCESS,
  LOAD_CHALLENGE_ATTEMPTED,
  LOAD_CHALLENGE_ERROR,
  LOAD_CHALLENGE_SUCCESS,
  SUBMIT_CHALLENGE_ATTEMPTED,
  SUBMIT_CHALLENGE_ERROR,
  SUBMIT_CHALLENGE_SUCCESS,
  LOAD_IDEAS_FOR_CHALLENGE,
  LOAD_SESSIONS_FOR_CHALLENGE,
  FORM_DATA_INVALIDATE,
  FORM_DATA_VALIDATE,
  SINGLE_FORM_DATA_INVALIDATE,
  SINGLE_FORM_DATA_VALIDATE
} from '../actions/challenges'

const EMPTY_FORM_DATA = {
  seconds: '',
  minutes: '',
  challengeDescription: '',
  taskDescription: '',
  methodicalDescription: '',
  inspirationText: '',
  inspirationImageData: '',
  inspirations: []
}
const INITIAL_STATE = {
  all: [],
  attempted: false,
  errorMessage: null,
  formData: {
    seconds: '',
    minutes: '',
    challengeDescription: '',
    taskDescription: '',
    methodicalDescription: '',
    inspirationText: '',
    inspirationImageData: '',
    inspirations: [],
    error: 'Title is missing.'
  },
  submit: {
    attempted: false,
    errorMessage: null
  },
  single: {
    attempted: false,
    errorMessage: null,
    originalResponse: null,
    ideas: [],
    sessions: [],
    formData: {
      seconds: '',
      minutes: '',
      challengeDescription: '',
      taskDescription: '',
      methodicalDescription: '',
      inspirationText: '',
      inspirationImageData: '',
      inspirations: [],
      title: '',
      error: null
    }
  }
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGED_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.formData
        }
      }
    case FORM_DATA_INVALIDATE:
      return {
        ...state,
        formData: {
          ...state.formData,
          error: action.error
        }
      }
    case FORM_DATA_VALIDATE:
      return {
        ...state,
        formData: {
          ...state.formData,
          error: null
        }
      }
    case SINGLE_FORM_DATA_INVALIDATE:
      return {
        ...state,
        single: {
          ...state.single,
          formData: {
            ...state.single.formData,
            error: action.error
          }
        }
      }
    case SINGLE_FORM_DATA_VALIDATE:
      return {
        ...state,
        single: {
          ...state.single,
          formData: {
            ...state.single.formData,
            error: null
          }
        }
      }
    case CHANGED_SINGLE_FORM_DATA:
      return {
        ...state,
        single: {
          ...state.single,
          formData: {
            ...state.single.formData,
            ...(action.formData === null ?  EMPTY_FORM_DATA : action.formData)
          }
        }
      }
    case LOAD_CHALLENGES_ATTEMPTED:
      return {
        ...state,
        attempted: true,
        errorMessage: null
      }
    case LOAD_CHALLENGES_ERROR:
      return {
        ...state,
        attempted: false,
        errorMessage: action.errorMessage
      }
    case LOAD_CHALLENGES_SUCCESS:
      return {
        ...state,
        all: action.challenges,
        attempted: false,
        errorMessage: null
      }
    case LOAD_CHALLENGE_ATTEMPTED:
      return {
        ...state,
        single: {
          ...state.single,
          attempted: true
        }
      }
    case LOAD_CHALLENGE_ERROR:
      return {
        ...state,
        single: {
          ...state.single,
          attempted: false,
          errorMessage: action.errorMessage
        }
      }
    case LOAD_CHALLENGE_SUCCESS:
      return {
        ...state,
        single: {
          ...state.single,
          attempted: false,
          originalResponse: action.originalResponse,
          formData: {
            ...state.single.formData,
            ...action.formData
          }
        }
      }
    case SUBMIT_CHALLENGE_ATTEMPTED:
      return {
        ...state,
        submit: {
          ...state.submit,
          attempted: true
        }
      }
    case SUBMIT_CHALLENGE_ERROR:
      return {
        ...state,
        submit: {
          ...state.submit,
          attempted: false,
          errorMessage: action.errorMessage
        }
      }
    case SUBMIT_CHALLENGE_SUCCESS:
      return {
        ...state,
        formData: {
          ...EMPTY_FORM_DATA
        },
        submit: {
          ...state.submit,
          attempted: false
        }
      }
    case LOAD_IDEAS_FOR_CHALLENGE:
      return {
        ...state,
        single: {
          ...state.single,
          ideas: action.ideas
        }
      }
    case LOAD_SESSIONS_FOR_CHALLENGE:
      return {
        ...state,
        single: {
          ...state.single,
          sessions: action.sessions
        }
      }
    default:
      return state
  }
}

import {
  ADD_EVENT,
  CLEAR_SESSION,
  GOT_SESSION_ID,
  SESSION_VALIDITY,
  SESSION_CHALLENGE_SUCCESS,
  IDEATOR_SUCCESS,
  ADD_IDEA,
  SET_SUBSCRIPTION_FORM_DATA,
  LOADED_INSPIRATIONS,
  SESSION_READY,
  SESSION_STARTED,
  TICK_TIMER,
  STOP_TIMER
} from '../actions/session'
import _ from 'lodash';


const INITIAL_STATE = {
  // currentSession: {
  //   id: null,
  //   isValid: false
  // },
  subscription: {
    formData: null
  },
  // challengeInfo: null,
  // ideatorInfo: null,
  // ideas: [],
  // events: [],
  // inspirations: [],
  // timerCompleted: false
}

export default function session(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        [action.challengeId]: {
          ...state[action.challengeId],
          events: state[action.challengeId].events
                  ? _.concat(state[action.challengeId].events, [{ type: action.eventType, timeInSession: action.eventTime }])
                  : [{ type: action.eventType, timeInSession: action.eventTime }]
        },
        subscription: {
          formData: null
        }
      };

    case CLEAR_SESSION:
      const { [action.challengeId]: challenge, ...rest } = state;
      return {
        ...rest
      };

    case GOT_SESSION_ID:
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          id: action.session
        }
      }
    case SESSION_VALIDITY:
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          isValid: action.isValid
        }
      }
    case SESSION_CHALLENGE_SUCCESS:
      let timer = action.challengeInfo.config.timePerSessionInMs;
      if (timer === undefined || timer === null) {
        timer = 0;
      }
      return {
        ...state,
        [action.challengeId]: {
          ...state[action.challengeId],
          challengeInfo: action.challengeInfo,
          timer
        },
      }
    case TICK_TIMER:
      return {
        ...state,
        [action.challengeId]: {
          ...state[action.challengeId],
          timer: state[action.challengeId].timer - 1
        }
      };
    case STOP_TIMER:
      return {
        ...state,
        [action.challengeId]: {
          ...state[action.challengeId],
          timer: 0
        }
      };
    case SESSION_READY:
      return {
        ...state,
        [action.challengeId]: {
          ...state[action.challengeId],
          ready: true
        },
      }
    case SESSION_STARTED:
      return {
        ...state,
        [action.challengeId]: {
          ...state[action.challengeId],
          started: true
        },
      }
    case IDEATOR_SUCCESS:
      return {
        ...state,
        [action.challengeId]: {
          ideatorInfo: action.ideatorInfo,
          challengeInfo: null,
          started: false,
          ready: false,
          timer: 0,
          ideas: [],
          events: []
        }
      }
    case ADD_IDEA:
      return {
        ...state,
        [action.challengeId]: {
          ...state[action.challengeId],
          ideas: _.concat(state[action.challengeId].ideas ? state[action.challengeId].ideas : [], [action.ideaText])
        }
      }
    case SET_SUBSCRIPTION_FORM_DATA:
      return {
        ...state,
        subscription: {
          formData: action.formData
        }
      }
    case LOADED_INSPIRATIONS:
      return {
        ...state,
        [action.challengeId]: {
          ...state[action.challengeId],
          inspirations: action.inspirations
        }
      }
    default:
      return state
  }
}

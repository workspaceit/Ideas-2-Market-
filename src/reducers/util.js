import { SHOW_LOADER, HIDE_LOADER, SHOW_LOADER2, HIDE_LOADER2 } from '../actions/util'
import { notify } from '../components'

const INITIAL_STATE = {
  loading: false,
  loading2: false,
  notify: notify
}

export default function util(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        loading: true
      }
    case HIDE_LOADER:
      return {
        ...state,
        loading: false
      }
    case SHOW_LOADER2:
      return {
        ...state,
        loading2: true
      }
    case HIDE_LOADER2:
      return {
        ...state,
        loading2: false
      }
    default:
      return state
  }
}
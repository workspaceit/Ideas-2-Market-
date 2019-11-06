import { connectRouter } from 'connected-react-router'
import auth from './auth'
import challenges from './challenges'
import session from './session'
import util from './util'


export default (history) => ({
  router: connectRouter(history),
  auth,
  challenges,
  session,
  util
})

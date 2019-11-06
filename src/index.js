import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore, { history } from './store/configureStore'
import './index.css'
import Routes from './Routes'
import * as serviceWorker from './serviceWorker'
import 'jquery/src/jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import { notify } from './components'


const INITIAL_STATE = {
  auth: {
    boot: {
      attempted: false,
      done: false
    },
    login: {
      attempted: false,
      errorMessage: null
    },
    userInfo: null
  },
  challenges: {
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
      title: '',
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
      },
      ideas: [],
      sessions: []
    }
  },
  session: {
    // currentSession: {
    //   id: null,
    //   isValid: false
    // },
    subscription: {
      formData: null
    },
    // challengeInfo: null,
    // inspirations: [],
    // ideatorInfo: null,
    // ideas: [],
    // events: [],
    // timerCompleted: false
  },
  util: {
    loading: false,
    loading2: false,
    notify: notify
  }
}
const { store, persistor } = configureStore(INITIAL_STATE)
// persistor.purge();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

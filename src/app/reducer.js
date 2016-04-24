import {combineReducers} from 'redux'
import {reducers} from 'trax'
import url from '../modules/url'
import ui from '../modules/ui'

const app = combineReducers({
  ...reducers,
  url: url.reducer,
  ui: ui.reducer,
})

export default app

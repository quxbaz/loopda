import {combineReducers} from 'redux'
import {reducers} from 'trax'
import url from '../modules/url'
import ui from '../modules/ui'
import audio from '../modules/audio'

const app = combineReducers({
  ...reducers,
  url: url.reducer,
  ui: ui.reducer,
  audio: audio.reducer,
})

export default app

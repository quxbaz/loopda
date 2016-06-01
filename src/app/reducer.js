import {combineReducers} from 'redux'
import {reducers} from 'trax'
import url from '../modules/url'
import ui from '../modules/ui'
import audio from '../modules/audio'
import channelColor from '../modules/channel-color'

const app = combineReducers({
  ...reducers,
  url: url.reducer,
  ui: ui.reducer,
  audio: audio.reducer,
  channelColor: channelColor.reducer,
})

export default app

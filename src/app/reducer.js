import {combineReducers} from 'redux'
import {sequencer} from 'trax'
import url from '../modules/url'

const app = combineReducers({
  sequencer: sequencer.reducer,
  url: url.reducer
})

export default app

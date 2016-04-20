import {combineReducers} from 'redux'
import {reducers} from 'trax'
import url from '../modules/url'

const app = combineReducers({
  ...reducers,
  url: url.reducer
})

export default app

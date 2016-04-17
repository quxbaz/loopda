import {combineReducers} from 'redux'
import {sequencer as _sequencer} from 'trax'

const sequencer = _sequencer.reducer

const app = combineReducers({sequencer})

export default app

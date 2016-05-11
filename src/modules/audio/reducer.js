import uniq from 'qux/lib/uniq'
import {actionTypes} from './actions'

const samples = (state=[], action) => {
  switch (action.type) {
    case actionTypes.ADD_SAMPLE:
      return uniq([...state, action.payload])
    default:
      return uniq(state)
  }
}

const audioInitialState = Object.freeze({
  samples: []
})

const audio = (state=audioInitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SAMPLE:
      return {
        ...state,
        samples: samples(state.samples, action)
      }
    default:
      return state
  }
}

export default audio

import omit from 'qux/lib/omit'
import actionTypes from './actionTypes'

export const mixableInitialState = Object.freeze({
  id: undefined,
  sample: undefined,
  offset: 0,
  minOffset: 0,
  maxOffset: 3600,  // 60 seconds
  gain: 1,
  minGain: 0,
  maxGain: 10,
  rate: 1,
  minRate: 0,
  maxRate: 4,
  pan: 0,
  minPan: -1,
  maxPan: 1,
  detune: 0,
  minDetune: -1200,
  maxDetune: 1200,
  attack: 0,
  minAttack: 0,
  maxAttack: 500,
})

const mixable = (state, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {...mixableInitialState, ...action.payload}
    case actionTypes.MIX:
      return {...state, ...action.payload.props}
    default:
      return state
  }
}

const mixables = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
    case actionTypes.MIX:
      var {id} = action.payload
      return {
        ...state,
        [id]: mixable(state[id], action)
      }
    case actionTypes.DESTROY:
      return omit(state, action.payload)
    case actionTypes.DEEP_COPY:
      return {
        ...state,
        [action.payload.copy.id]: {
          ...state[action.payload.id],
          ...action.payload.copy,
        }
      }
    default:
      return state
  }

}

export default mixables

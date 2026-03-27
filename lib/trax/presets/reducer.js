import omit from 'qux/lib/omit'
import actionTypes from './actionTypes'

export const presetInitialState = Object.freeze({
  id: undefined,
  title: undefined,
  sample: undefined,
  mixable: undefined,
})

const preset = (state, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {...presetInitialState, ...action.payload}
    default:
      return state
  }
}

const presets = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      var {id} = action.payload
      return {
        ...state,
        [id]: preset(state[id], action)
      }
    case actionTypes.DESTROY:
      return omit(state, action.payload)
    default:
      return state
  }
}

export default presets

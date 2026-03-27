import actionTypes from './actionTypes'

export const blipInitialState = Object.freeze({
  id: undefined,
  beat: undefined,
  color: undefined,
  mute: false,
  mixable: undefined,
})

const blip = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {...blipInitialState, ...action.payload}
    case actionTypes.MUTE:
      return state.mute ? state : {...state, mute: true}
    case actionTypes.UNMUTE:
      return !state.mute ? state : {...state, mute: false}
    case actionTypes.TOGGLE:
      return {...state, mute: !state.mute}
    default:
      return state
  }
}

const blips = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {
        ...state,
        [action.payload.id]: blip(undefined, action)
      }
    case actionTypes.DEEP_COPY:
      return {
        ...state,
        [action.payload.copy.id]: {
          ...state[action.payload.id],
          ...action.payload.copy,
        }
      }
    case actionTypes.MUTE:
    case actionTypes.UNMUTE:
    case actionTypes.TOGGLE:
      return {
        ...state,
        [action.payload]: blip(state[action.payload], action)
      }
    default:
      return state
  }
}

export default blips

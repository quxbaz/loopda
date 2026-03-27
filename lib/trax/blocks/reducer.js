import omit from 'qux/lib/omit'
import without from 'qux/lib/without'
import mapValues from 'qux/lib/mapValues'
import channels from '../channels'
import actionTypes from './actionTypes'

export const blockInitialState = Object.freeze({
  id: undefined,
  song: undefined,
  channels: [],
})

const block = (state, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {...blockInitialState, ...action.payload}
    case actionTypes.ADD_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.payload.channel],
      }
    case actionTypes.REMOVE_CHANNEL:
      return {
        ...state,
        channels: without(state.channels, action.payload.channel),
      }
    case channels.actionTypes.DESTROY:
      return {
        ...state,
        channels: without(state.channels, action.payload),
      }
    default:
      return state
  }
}

const blocks = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
    case actionTypes.ADD_CHANNEL:
    case actionTypes.REMOVE_CHANNEL:
      const {id} = action.payload
      return {
        ...state,
        [id]: block(state[id], action),
      }
    case actionTypes.DESTROY:
      return omit(state, action.payload)
    case actionTypes.DEEP_COPY:
      return {
        ...state,
        [action.payload.copy.id]: {
          ...state[action.payload.id],
          ...action.payload.copy,
        },
      }
    case channels.actionTypes.DESTROY:
      return mapValues(state, (v) => block(v, action))
    default:
      return state
  }
}

export default blocks

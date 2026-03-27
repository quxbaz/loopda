import omit from 'qux/lib/omit'
import util from '../util'
import actionTypes from './actionTypes'

export const channelInitialState = Object.freeze({
  id: undefined,
  number: undefined,
  title: undefined,
  color: undefined,
  beats: 16,
  mute: false,
  solo: false,
  archived: false,
  preset: undefined,
  blips: Object.freeze([
    null, null, null, null,
    null, null, null, null,
    null, null, null, null,
    null, null, null, null
  ]),
})

const channel = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {...channelInitialState, ...action.payload}
    case actionTypes.ARCHIVE:
      return {...state, archived: true, solo: false}
    case actionTypes.RESTORE:
      return {...state, archived: false}
    case actionTypes.TOGGLE_MUTE:
      return {...state, mute: !state.mute}
    case actionTypes.TOGGLE_SOLO:
      return {...state, solo: !state.solo}
    case actionTypes.SET_BLIP_AT:
      var {position, blipId} = action.payload
      return {
          ...state,
        blips: util.replaceAt(state.blips, position, blipId)
      }
    default:
      return state
  }
}

const channels = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {
        ...state,
        [action.payload.id]: channel(undefined, action)
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
    case actionTypes.ARCHIVE:
    case actionTypes.RESTORE:
    case actionTypes.TOGGLE_MUTE:
    case actionTypes.TOGGLE_SOLO:
      return {
        ...state,
        [action.payload]: channel(state[action.payload], action)
      }
    case actionTypes.SET_BLIP_AT:
      var {id} = action.payload
      return {
        ...state,
        [id]: channel(state[id], action)
      }
    default:
      return state
  }
}

export default channels

import omit from 'qux/lib/omit'
import without from 'qux/lib/without'
import mapValues from 'qux/lib/mapValues'
import move from 'qux/lib/move'
import blocks from '../blocks'
import actionTypes from './actionTypes'

export const songInitialState = Object.freeze({
  id: undefined,
  title: '',
  blocks: [],
})

const song = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {...songInitialState, ...action.payload}
    case actionTypes.ADD_BLOCK:
      return {
        ...state,
        blocks: [...state.blocks, action.payload.block],
      }
    case actionTypes.ADD_BLOCK_AT:
      var end = state.blocks.length
      return {
        ...state,
        blocks: move([...state.blocks, action.payload.block], end, action.payload.i),
      }
    case actionTypes.REMOVE_BLOCK:
      return {
        ...state,
        blocks: without(state.blocks, action.payload.block),
      }
    case actionTypes.MOVE_BLOCK:
      var {from, to} = action.payload
      return {
        ...state,
        blocks: move(state.blocks, from, to),
      }
    case blocks.actionTypes.DESTROY:
      return {
        ...state,
        blocks: without(state.blocks, action.payload),
      }
    default:
      return state
  }
}

const songs = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {
        ...state,
        [action.payload.id]: song(undefined, action),
      }
    case actionTypes.DESTROY:
      return omit(state, action.payload)
    case actionTypes.ADD_BLOCK:
    case actionTypes.ADD_BLOCK_AT:
    case actionTypes.REMOVE_BLOCK:
    case actionTypes.MOVE_BLOCK:
      const {id} = action.payload
      return {
        ...state,
        [id]: song(state[id], action),
      }
    case blocks.actionTypes.DESTROY:
      return mapValues(state, (v) => song(v, action))
    default:
      return state
  }
}

export default songs

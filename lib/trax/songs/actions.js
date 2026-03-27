import id from '../id'
import blocks from '../blocks'
import actionTypes from './actionTypes'
import selectors from './selectors'

const create = (state={}) => (dispatch) => {
  return dispatch({
    type: actionTypes.CREATE,
    payload: {
      id: dispatch(id.actions.gen(state)),
      ...state,
    },
  })
}

const destroy = (id) => ({
  type: actionTypes.DESTROY,
  payload: id,
})

const addBlock = (id, block) => ({
  type: actionTypes.ADD_BLOCK,
  payload: {id, block},
})

const addBlockAt = (id, block, i) => ({
  type: actionTypes.ADD_BLOCK_AT,
  payload: {id, block, i},
})

const removeBlock = (id, block) => ({
  type: actionTypes.REMOVE_BLOCK,
  payload: {id, block},
})

const moveBlock = (id, from, to) => ({
  type: actionTypes.MOVE_BLOCK,
  payload: {id, from, to},
})

const createBlock = (id, state) => (dispatch) => {
  const action = dispatch(blocks.actions.create({
    song: id,
    ...state,
  }))
  dispatch(addBlock(id, action.payload.id))
  return action
}

const createBlockAt = (id, i, state) => (dispatch) => {
  const action = dispatch(blocks.actions.create({
    song: id,
    ...state,
  }))
  dispatch(addBlockAt(id, action.payload.id, i))
  return action
}

export default {
  create, destroy,
  addBlock, addBlockAt,
  removeBlock, moveBlock,
  createBlock, createBlockAt,
}

import id from '../id'
import channels from '../channels'
import actionTypes from './actionTypes'
import selectors from './selectors'

const create = (state) => (dispatch) => {
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

const deepCopy = (source, state={}) => (dispatch, getState) => {
  const block = selectors.getById(source)(getState())
  return dispatch({
    type: actionTypes.DEEP_COPY,
    payload: {
      id: source,
      copy: {
        id: dispatch(id.actions.gen(state)),
        channels: state.channels || block.channels.map((channel) => (
          dispatch(channels.actions.deepCopy(channel)).payload.copy.id
        )),
        ...state,
      },
    },
  })
}

const addChannel = (id, channel) => ({
  type: actionTypes.ADD_CHANNEL,
  payload: {id, channel},
})

const removeChannel = (id, channel) => ({
  type: actionTypes.REMOVE_CHANNEL,
  payload: {id, channel},
})

export default {
  create, destroy, deepCopy,
  addChannel, removeChannel,
}

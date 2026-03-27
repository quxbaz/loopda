import id from '../id'
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
  payload: id
})

const deepCopy = (source, state={}) => (dispatch) => {
  return dispatch({
    type: actionTypes.DEEP_COPY,
    payload: {
      id: source,
      copy: {
        id: dispatch(id.actions.gen(state)),
        ...state,
      },
    },
  })
}

const mix = (id, props) => ({
  type: actionTypes.MIX,
  payload: {id, props}
})

export default {
  create, destroy, deepCopy, mix,
}

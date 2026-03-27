import actionTypes from './actionTypes'

const create = (state) => ({
  type: actionTypes.CREATE,
  payload: state
})

export default {
  create,
}

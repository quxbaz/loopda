import isNil from 'qux/lib/isNil'

const actionTypes = {
  INC: 'trax/id/INC',
}

const inc = () => ({
  type: actionTypes.INC,
})

const gen = (state={}) => (dispatch, getState) => {
  let next = state.id
  if (isNil(next)) {
    dispatch(inc())
    next = getState().id
  }
  return next
}

const actions = {inc, gen}

const reducer = (state='0', action) => {
  switch (action.type) {
    case actionTypes.INC:
      return (parseInt(state) + 1).toString()
    default:
      return state
  }
}

export default {actionTypes, actions, reducer}

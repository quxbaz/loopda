import {actionTypes} from './actions'

const url = (state='/', action) => {
  switch (action.type) {
    case actionTypes.SET_URL:
      return action.payload
    default:
      return state
  }
}

export default url

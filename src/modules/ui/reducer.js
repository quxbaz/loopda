import {combineReducers} from 'redux'
import {actionTypes} from './actions'

export const pageInitialState = {
  current: 0,  // The current page
  size: 50,
}

const page = (state=pageInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return {...state, current: action.payload}
    case actionTypes.FIRST_PAGE:
      return {...state, current: 0}
    case actionTypes.LAST_PAGE:
      throw new Error('<TODO>')
    case actionTypes.NEXT_PAGE:
      return {
        ...state,
        current: state.current + 1
      }
    case actionTypes.PREV_PAGE:
      return {
        ...state,
        current: Math.max(0, state.current - 1)
      }
    default:
      return state
  }
}

const ui = combineReducers({page})

export default ui

import actionTypes from './actionTypes'
import channels from '../channels'

export const initialState = Object.freeze({
  beats: 16,
})

const sequencer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default sequencer

import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  playing: false,
  loop: false,
  beats: 16,
  beatDuration: 100,
  currentBeat: -1,
  currentSong: undefined,
})

const player = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {...state, ...action.payload}
    case actionTypes.PLAY:
      return {...state, playing: true}
    case actionTypes.PAUSE:
      return {...state, playing: false}
    case actionTypes.STOP:
      return {...state, playing: false, currentBeat: -1}
    case actionTypes.RESTART:
      return {...state, playing: true, currentBeat: -1}
    case actionTypes.TOGGLE_PLAY:
      return {...state, playing: !state.playing}
    case actionTypes.TICK:
      return {
        ...state,
        currentBeat: state.currentBeat + 1,
      }
    case actionTypes.REVERSE_TICK:
      return {
        ...state,
        currentBeat: Math.max(-1, state.currentBeat - 1),
      }
    case actionTypes.SET_LOOP:
      return {...state, loop: action.payload}
    case actionTypes.TOGGLE_LOOP:
      return {...state, loop: !state.loop}
    case actionTypes.SET_BEAT_DURATION:
      return {...state, beatDuration: action.payload}
    case actionTypes.SET_CURRENT_BEAT:
      return {...state, currentBeat: action.payload}
    case actionTypes.SET_CURRENT_SONG:
    case actionTypes.CLEAR_CURRENT_SONG:
      return {...state, currentSong: action.payload}
    default:
      return state
  }
}

export default player

import actionTypes from './actionTypes'

const create = (state) => ({
  type: actionTypes.CREATE,
  payload: state,
})

const play = () => ({
  type: actionTypes.PLAY,
})

const pause = () => ({
  type: actionTypes.PAUSE,
})

const togglePlay = () => ({
  type: actionTypes.TOGGLE_PLAY,
})

const setBeatDuration = (duration) => ({
  type: actionTypes.SET_BEAT_DURATION,
  payload: duration,
})

const setCurrentBeat = (beat) => ({
  type: actionTypes.SET_CURRENT_BEAT,
  payload: beat,
})

const restart = () => ({
  type: actionTypes.RESTART,
})

const tick = () => ({
  type: actionTypes.TICK,
})

const reverseTick = () => ({
  type: actionTypes.REVERSE_TICK,
})

const setCurrentBlock = (id) => ({
  type: actionTypes.SET_CURRENT_BLOCK,
  payload: id,
})

const clearCurrentBlock = () => ({
  type: actionTypes.CLEAR_CURRENT_BLOCK,
  payload: null,
})

export default {
  create,
  play, pause, togglePlay,
  setBeatDuration, setCurrentBeat,
  restart, tick, reverseTick,
  setCurrentBlock, clearCurrentBlock,
}

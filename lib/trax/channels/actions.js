import isNil from 'qux/lib/isNil'
import id from '../id'
import blips from '../blips'
import presets from '../presets'
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

const deepCopy = (source, state={}) => (dispatch, getState) => {
  const channel = selectors.getById(source)(getState())
  return dispatch({
    type: actionTypes.DEEP_COPY,
    payload: {
      id: source,
      copy: {
        id: dispatch(id.actions.gen(state)),
        blips: state.blips || channel.blips.map((blip) => (
          isNil(blip) ? blip :
            dispatch(blips.actions.deepCopy(blip)).payload.copy.id
        )),
        ...state,
      },
    },
  })
}

const archive = (id) => ({
  type: actionTypes.ARCHIVE,
  payload: id
})

const restore = (id) => ({
  type: actionTypes.RESTORE,
  payload: id
})

const toggleMute = (id) => ({
  type: actionTypes.TOGGLE_MUTE,
  payload: id
})

const toggleSolo = (id) => ({
  type: actionTypes.TOGGLE_SOLO,
  payload: id
})

const setBlipAt = (id, i, blipId) => ({
  type: actionTypes.SET_BLIP_AT,
  payload: {
    id,
    position: i,
    blipId
  }
})

const createBlipAt = (id, i, blipState={}) => (dispatch, getState) => {
  /*
     Creates a blip at a position if it doesn't exist.
  */
  const state = getState()
  const channel = selectors.getById(id)(state)
  if (!isNil(channel.blips[i]))
    return
  const {mixable} = presets.selectors.getById(channel.preset)(state)
  const action = dispatch(blips.actions.create({
    beat: i,
    color: channel.color,
    mixable,
    ...blipState,
  }))
  dispatch(setBlipAt(id, i, action.payload.id))
}

const muteBlipAt = (id, i) => (dispatch, getState) => {
  /*
    Mutes a blip at a position or does nothing if it's null.
  */
  const channel = selectors.getById(id)(getState())
  if (isNil(channel.blips[i]))
    return
  dispatch(blips.actions.mute(channel.blips[i]))
}

const unmuteBlipAt = (id, i, blipState={}) => (dispatch, getState) => {
  /*
    Creates or unmutes a blip at a position.
  */
  const state = getState()
  const channel = selectors.getById(id)(state)
  if (!isNil(channel.blips[i])) {
    dispatch(blips.actions.unmute(channel.blips[i]))
  } else {
    dispatch(createBlipAt(id, i, blipState))
  }
}
const toggleBlipAt = (id, i) => (dispatch, getState) => {
  /*
    Toggles a blip at a position if it exists else create one.
  */
  const state = getState()
  const channel = selectors.getById(id)(state)
  if (!isNil(channel.blips[i])) {
    dispatch(blips.actions.toggle(channel.blips[i]))
  } else {
    dispatch(createBlipAt(id, i))
  }

}

export default {
  create, destroy, deepCopy,
  archive, restore, toggleMute, toggleSolo,
  setBlipAt, createBlipAt, muteBlipAt, unmuteBlipAt, toggleBlipAt,
}

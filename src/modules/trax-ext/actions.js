import {channels, presets} from 'trax'
import util from './util'

const createChannel = (state) => (dispatch, getState) => {
  const storeState = getState()
  const all = channels.selectors.getAll(storeState)
  return dispatch(channels.actions.create({
    number: util.getNextNumber(all),
    title: presets.selectors.getById(state.preset)(storeState).sample,
    color: util.randomChannelHSL(),
    ...state,
  }))
}

export default {createChannel}

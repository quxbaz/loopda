import {channels, presets} from 'trax'
import util from './util'

// testing
import channelColor from '../channel-color'

const createChannel = (state) => (dispatch, getState) => {
  const storeState = getState()
  const all = channels.selectors.getAll(storeState)

  const color = dispatch(channelColor.actions.cycleColor())

  return dispatch(channels.actions.create({
    number: util.getNextNumber(all),
    title: presets.selectors.getById(state.preset)(storeState).sample,

    color,
    // color: util.randomChannelHSL(),

    ...state,
  }))
}

export default {createChannel}

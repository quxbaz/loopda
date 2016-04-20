import _ from 'lodash'
import {channels} from 'trax'
import util from './util'

const createChannel = (state) => (dispatch, getState) => {
  const all = channels.selectors.getAll(getState())
  dispatch(
    channels.actions.createChannel({
      number: util.getNextNumber(all),
      title: state.sample,
      color: util.randomChannelHSL(),
      ...state
    })
  )
}

export default {createChannel}

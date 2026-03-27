import values from 'qux/lib/values'
import util from '../util'
import channels from '../channels'

const getAll = (state) => values(state.blocks)

const getById = (id) => (state) => state.blocks[id]

const getChannels = (id) => (state) => (
  getById(id)(state).channels.map((channel) => (
    channels.selectors.getById(channel)(state)
  ))
)

const getEnabledChannels = (id) => (state) => (
  util.getEnabledChannels(
    getChannels(id)(state)
  )
)

const isSoloMode = (id) => (state) => getChannels(id)(state).some(
  c => c.solo
)

export default {
  getAll, getById,
  getChannels, getEnabledChannels,
  isSoloMode,
}

import values from 'qux/lib/values'
import blocks from '../blocks'

const getAll = (state) => values(state.songs)
const getById = (id) => (state) => state.songs[id]
const getBlocks = (id) => (state) => (
  getById(id)(state).blocks.map((block) => (
    blocks.selectors.getById(block)(state)
  ))
)

export default {getAll, getById, getBlocks}

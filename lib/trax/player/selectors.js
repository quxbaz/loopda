import blocks from '../blocks'

const getCurrentBlock = (state) => (
  blocks.selectors.getById(state.player.currentBlock)(state)
)

export default {getCurrentBlock}

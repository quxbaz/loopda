import React from 'react'
import BlockItem from './BlockItem'

const BlockGrid = ({blocks, currentBeat, onClickBlock}) => (
  <div className="block-grid">
    {blocks.map((block, i) => (
      <BlockItem key={block.id} i={i} currentBeat={currentBeat} block={block}
        onClick={onClickBlock} />
    ))}
  </div>
)

BlockGrid.propTypes = {
  blocks: React.PropTypes.array.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  onClickBlock: React.PropTypes.func.isRequired,
}

export default BlockGrid

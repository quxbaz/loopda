import React from 'react'
import BlockItem from '../containers/BlockItem'

const BlockGrid = ({songId, blocks, currentBeat, onClickBlock}) => (
  <div className="block-grid">
    {blocks.map((block, i) => (
      <BlockItem key={block.id} i={i} songId={songId} currentBeat={currentBeat} block={block} />
    ))}
  </div>
)

BlockGrid.propTypes = {
  songId: React.PropTypes.string.isRequired,
  blocks: React.PropTypes.array.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
}

export default BlockGrid

import React from 'react'
import BlockItem from './BlockItem'

const BlockGrid = ({blocks}) => (
  <div className="block-grid">
    {blocks.map((block) => (
      <BlockItem key={block.id} block={block} />
    ))}
  </div>
)

BlockGrid.propTypes = {
  blocks: React.PropTypes.array.isRequired,
}

export default BlockGrid

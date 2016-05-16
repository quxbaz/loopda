import React from 'react'
import BlockItem from './BlockItem'

const BlockGrid = ({blocks, onClickBlock}) => (
  <div className="block-grid">
    {blocks.map((block) => (
      <BlockItem key={block.id} block={block}
        onClick={onClickBlock} />
    ))}
  </div>
)

BlockGrid.propTypes = {
  blocks: React.PropTypes.array.isRequired,
  onClickBlock: React.PropTypes.func.isRequired,
}

export default BlockGrid

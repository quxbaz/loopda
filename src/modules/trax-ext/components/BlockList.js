import React from 'react'
import Block from './Block'

const BlockList = ({Child, blocks, selected, onClickBlock}) => (
  <div className="block-list">
    {blocks.map((block) => React.createElement(Child ? Child : Block, {
      key: block.id,
      block: block,
      selected: selected === block.id,
      onClick: onClickBlock,
    }))}
  </div>
)

BlockList.propTypes = {
  Child: React.PropTypes.func,
  blocks: React.PropTypes.array.isRequired,
  selected: React.PropTypes.string,
  onClickBlock: React.PropTypes.func,
}

export default BlockList

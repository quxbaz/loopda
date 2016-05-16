import React from 'react'

const BlockItem = ({block}) => (
  <div className="block-item">
    item
  </div>
)

BlockItem.propTypes = {
  block: React.PropTypes.object.isRequired,
}

export default BlockItem

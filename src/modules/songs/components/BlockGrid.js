import React from 'react'
import BlockItem from '../containers/BlockItem'

class BlockGrid extends React.Component {

  constructor(props) {
    super(props)
    this.handleBlockDragStart = this.handleBlockDragStart.bind(this)
    this.state = {dragSource: undefined}
  }

  handleBlockDragStart(i) {
    this.setState({dragSource: i})
  }

  render() {
    const {songId, blocks, currentBeat, onBlockDragStart} = this.props
    return (
      <div className="block-grid">
        {blocks.map((block, i) => (
          <BlockItem key={block.id} i={i} songId={songId} currentBeat={currentBeat} block={block}
            dragSource={this.state.dragSource} onDragStart={this.handleBlockDragStart} />
        ))}
      </div>
    )
  }

}

BlockGrid.propTypes = {
  songId: React.PropTypes.string.isRequired,
  blocks: React.PropTypes.array.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
}

export default BlockGrid

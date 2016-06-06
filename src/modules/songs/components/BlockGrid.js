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

  getBeatOffset(i) {
    const {currentBeat} = this.props
    if (currentBeat >= (i * 16) && currentBeat < ((i + 1) * 16)) {
      return currentBeat % 16
    } else {
      return -1
    }
  }

  render() {
    const {blocks, currentBeat, onBlockDragStart} = this.props
    return (
      <div className="block-grid">
        {blocks.map((block, i) => (
          <BlockItem key={block.id} i={i} block={block}
            beatOffset={this.getBeatOffset(i)}
            dragSource={this.state.dragSource} onDragStart={this.handleBlockDragStart} />
        ))}
      </div>
    )
  }

}

BlockGrid.propTypes = {
  blocks: React.PropTypes.array.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
}

export default BlockGrid

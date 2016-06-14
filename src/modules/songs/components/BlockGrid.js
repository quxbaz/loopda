import React, {Component, PropTypes} from 'react'
import BlockItem from '../providers/BlockItem'

class BlockGrid extends Component {

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
    const {ids, currentBeat} = this.props
    return (
      <div className="block-grid">
        {ids.map((id, i) => (
          <BlockItem key={id} id={id} i={i}
            beatOffset={this.getBeatOffset(i)}
            dragSource={this.state.dragSource} onDragStart={this.handleBlockDragStart} />
        ))}
      </div>
    )
  }

}

BlockGrid.propTypes = {
  ids: PropTypes.array.isRequired,
  currentBeat: PropTypes.number.isRequired,
}

export default BlockGrid

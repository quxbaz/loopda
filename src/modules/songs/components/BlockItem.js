import React from 'react'
import blocks from '../../blocks'
import ChannelList from '../containers/ChannelList'

class BlockItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.block.id)
  }

  render() {
    const {i, block, currentBeat} = this.props
    return (
      <div className="block-item">
        <a onClick={this.handleClick}>{block.id}</a>
        <div className="relative">
          <blocks.components.TempoBar beat={currentBeat - i * 16} />
          <ChannelList ids={block.channels} />
        </div>
      </div>
    )
  }

}

BlockItem.propTypes = {
  i: React.PropTypes.number.isRequired,
  block: React.PropTypes.object.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired,
}

export default BlockItem

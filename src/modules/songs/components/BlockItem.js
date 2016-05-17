import React from 'react'
import blocks from '../../blocks'
import traxExt from '../../trax-ext'
import ChannelList from '../containers/ChannelList'

class BlockItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClickBeat = this.handleClickBeat.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.block.id)
  }

  handleClickBeat(event) {
    const beat = traxExt.util.getBeatClicked(event, this.refs.channels)
    this.props.onClickBeat(this.props.i * 16 + beat)
  }

  render() {
    const {i, block, currentBeat, onClickBeat} = this.props
    return (
      <div className="block-item">
        <a onClick={this.handleClick}>{block.id}</a>
        <div ref="channels" className="relative" onClick={this.handleClickBeat}>
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
  onClickBeat: React.PropTypes.func.isRequired,
}

export default BlockItem

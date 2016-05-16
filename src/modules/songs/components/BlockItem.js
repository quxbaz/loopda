import React from 'react'
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
    const {block} = this.props
    return (
      <div className="block-item">
        <a onClick={this.handleClick}>{block.id}</a>
        <ChannelList ids={block.channels} />
      </div>
    )
  }

}

BlockItem.propTypes = {
  block: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
}

export default BlockItem

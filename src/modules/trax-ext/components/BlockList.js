import React from 'react'
import ChannelList from '../containers/ChannelList'

class Block extends React.Component {

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
      <div className="block" onClick={this.handleClick}>
        <ChannelList ids={block.channels} />
      </div>
    )
  }

}

Block.propTypes = {
  block: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
}

Block.defaultProps = {
  onClick: () => {},
}

const BlockList = ({blocks, onClickBlock}) => (
  <div className="block-list">
    {blocks.map((block) => (
      <Block key={block.id} block={block} onClick={onClickBlock} />
    ))}
  </div>
)

BlockList.propTypes = {
  blocks: React.PropTypes.array.isRequired,
  onClickBlock: React.PropTypes.func,
}

export default BlockList

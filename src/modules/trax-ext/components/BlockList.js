import React from 'react'
import classNames from 'classnames'
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
    const {block, selected} = this.props
    const cssClass = classNames({
      'block': true,
      selected,
    })
    return (
      <div className={cssClass} onClick={this.handleClick}>
        <ChannelList ids={block.channels} />
      </div>
    )
  }

}

Block.propTypes = {
  block: React.PropTypes.object.isRequired,
  selected: React.PropTypes.bool,
  onClick: React.PropTypes.func,
}

Block.defaultProps = {
  selected: false,
  onClick: () => {},
}

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

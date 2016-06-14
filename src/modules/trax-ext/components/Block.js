import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {PureComponent} from 'loopda/lib/react-ext'
import ChannelList from '../components/ChannelList'

class Block extends PureComponent {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.block.id)
  }

  render() {
    const {block, isSoloMode, selected} = this.props
    const cssClass = classNames({
      'block': true,
      selected,
    })
    return (
      <div className={cssClass} onClick={this.handleClick}>
        <ChannelList ids={block.channels} isSoloMode={isSoloMode} />
      </div>
    )
  }

}

Block.propTypes = {
  block: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  isSoloMode: PropTypes.bool.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
}

Block.defaultProps = {
  selected: false,
  onClick: () => {},
}

export default Block

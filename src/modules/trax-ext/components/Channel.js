import React, {PropTypes} from 'react'
import classNames from 'classnames'
import isNil from 'qux/lib/isNil'
import {fireOnce} from 'dom-util'
import {PureComponent} from 'loopda/lib/react-ext'
import Blip from '../providers/Blip'

class Channel extends PureComponent {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = {
      mouseDown: false,
      blipWasMuted: false,
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp)
  }

  handleClick() {
    this.props.onClick(this.props.channel)
  }

  handleMouseDown(event) {
    const blipWasMuted = this.props.onMouseDown(event, this.refs.div)
    this.setState({mouseDown: true, blipWasMuted})
    this.onMouseUp = fireOnce(window, 'mouseup', () => {
      this.setState({mouseDown: false, blipWasMuted})
    })
  }

  handleMouseMove(event) {
    if (this.state.mouseDown) {
      this.props.onMouseMove(event, this.refs.div, this.state.blipWasMuted)
    }
  }

  render() {

    const {channel, isSoloMode} = this.props
    const {archived, solo, mute} = channel
    const enabled = (isSoloMode && solo) || (!isSoloMode && !mute)

    const cssClass = classNames({
      channel: true,
      mute: !enabled,
      enabled,
      archived,
    })

    return (
      <div ref="div" className={cssClass} onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}>
          {channel.blips.filter(id => !isNil(id)).map((id) => (
            <Blip key={id} id={id} />
          ))}
      </div>
    )

  }

}

Channel.propTypes = {
  channel: PropTypes.object.isRequired,
  isSoloMode: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
}

Channel.defaultProps = {
  isSoloMode: false,
  onClick: () => {},
  onMouseDown: () => {},
  onMouseMove: () => {},
}

export default Channel

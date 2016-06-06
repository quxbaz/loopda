import React from 'react'
import classNames from 'classnames'
import {fireOnce} from 'dom-util'
import {PureComponent} from 'loopda/lib/react-ext'
import BlipList from '../containers/BlipList'

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

    const {channel, enabled, onMouseDown} = this.props

    const cssClass = classNames({
      channel: true,
      mute: !enabled,
      enabled,
      archived: channel.archived,
    })

    return (
      <div ref="div" className={cssClass} onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove} >
        <BlipList ids={channel.blips} />
      </div>
    )

  }

}

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  enabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  onMouseMove: React.PropTypes.func,
}

Channel.defaultProps = {
  enabled: true,
  onClick: () => {},
  onMouseDown: () => {},
  onMouseMove: () => {},
}

export default Channel

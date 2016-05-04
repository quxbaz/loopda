import React from 'react'
import classNames from 'classnames'
import {PureComponent} from 'loopda/lib/react-ext'
import Blip from '../containers/Blip'

class Channel extends PureComponent {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.channel)
  }

  handleMouseDown(event) {
    this.props.onMouseDown(event, this.refs.div)
  }

  render() {

    const {channel, enabled, onMouseDown, onClickBlip} = this.props

    const cssClass = classNames({
      channel: true,
      mute: !enabled,
      enabled
    })

    return (
      <div ref="div" className={cssClass} onClick={this.handleClick} onMouseDown={this.handleMouseDown}>
        {channel.blips.map((id, i) => {
          if (!id)
            return null
          return <Blip key={i} id={id} onClickBlip={onClickBlip} />
        })}
      </div>
    )

  }

}

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  enabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  onClickBlip: React.PropTypes.func,
}

Channel.defaultProps = {
  enabled: true,
  onClick: () => {},
  onMouseDown: () => {},
}

export default Channel

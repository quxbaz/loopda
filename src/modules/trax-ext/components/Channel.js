import React from 'react'
import classNames from 'classnames'
import {PureComponent} from 'loopda/lib/react-ext'
import Blip from '../containers/Blip'

class Channel extends PureComponent {

  constructor(props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown(event) {
    this.props.onMouseDown(event, this.refs.div)
  }

  render() {

    const {channel, enabled, onMouseDown} = this.props

    const cssClass = classNames({
      channel: true,
      mute: !enabled,
      enabled
    })

    return (
      <div ref="div" className={cssClass} onMouseDown={this.handleMouseDown}>
        {channel.blips.map((id, i) => {
          if (!id)
            return null
          return <Blip key={i} id={id} />
        })}
      </div>
    )

  }

}

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  enabled: React.PropTypes.bool,
  onMouseDown: React.PropTypes.func
}

Channel.defaultProps = {
  enabled: true,
  onMouseDown: () => {}
}

export default Channel

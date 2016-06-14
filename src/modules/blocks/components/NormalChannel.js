import React, {PropTypes} from 'react'
import {PureComponent} from 'loopda/lib/react-ext'
import ChannelControls from '../containers/ChannelControls'
import Channel from '../containers/Channel'

class NormalChannel extends PureComponent {
  render() {
    const {channel, isSoloMode} = this.props
    return (
      <div className="normal-channel">
        <ChannelControls channel={channel} />
        <Channel channel={channel} isSoloMode={isSoloMode} />
      </div>
    )
  }
}

NormalChannel.propTypes = {
  channel: PropTypes.object.isRequired,
  isSoloMode: PropTypes.bool.isRequired,
}

export default NormalChannel

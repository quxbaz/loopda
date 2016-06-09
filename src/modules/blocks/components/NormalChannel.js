import React from 'react'
import {PureComponent} from 'loopda/lib/react-ext'
import ChannelControls from '../containers/ChannelControls'
import Channel from '../containers/Channel'

class NormalChannel extends PureComponent {
  render() {
    const {channel, isSoloMode} = this.props
    const {solo, mute} = channel
    const enabled = (!isSoloMode && !mute) || (isSoloMode && solo)
    return (
      <div className="normal-channel">
        <ChannelControls channel={channel} />
        <Channel channel={channel} enabled={enabled} />
      </div>
    )
  }
}

NormalChannel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
}

export default NormalChannel

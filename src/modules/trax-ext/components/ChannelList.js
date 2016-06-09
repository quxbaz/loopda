import React from 'react'
import Channel from './Channel'

const ChannelList = ({channels, isSoloMode}) => (
  <div className="channel-list">
    {channels.map((channel) => (
      <Channel key={channel.id} channel={channel}
        enabled={(isSoloMode && channel.solo) || (!isSoloMode && !channel.mute)} />
    ))}
  </div>
)

ChannelList.propTypes = {
  channels: React.PropTypes.array.isRequired,
  isSoloMode: React.PropTypes.bool,
}

ChannelList.defaultProps = {
  isSoloMode: false,
}

export default ChannelList

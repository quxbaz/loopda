import React from 'react'
import Channel from './Channel'

const ChannelList = ({channels, isSoloMode, onClickChannel}) => (
  <div className="channel-list">
    {channels.map((channel) => (
        <Channel key={channel.id} channel={channel}
          enabled={(isSoloMode && channel.solo) || (!isSoloMode && !channel.mute)}
          onClick={onClickChannel} />
    ))}
  </div>
)

ChannelList.propTypes = {
  channels: React.PropTypes.array.isRequired,
  isSoloMode: React.PropTypes.bool,
  onClickChannel: React.PropTypes.func,
}

ChannelList.defaultProps = {
  isSoloMode: false,
  onClickChannel: () => {},
}

export default ChannelList

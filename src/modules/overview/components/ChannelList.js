import React from 'react';
// import ChannelBlock from '../containers/ChannelBlock'
import ChannelBlock from '../components/ChannelBlock'

const ChannelList = ({channels}) => {

  return (
    <div className="channel-list">
      {channels.map(channel =>
        <ChannelBlock key={channel.id} channel={channel} />
      )}
    </div>
  )

}

ChannelList.propTypes = {
  channels: React.PropTypes.array.isRequired
}

export default ChannelList

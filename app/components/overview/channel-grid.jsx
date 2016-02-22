import React from 'react';
import ChannelWrapperCom from './channel-wrapper';

ChannelGrid.propTypes = {
  channels: React.PropTypes.array.isRequired,
  currentBeat: React.PropTypes.number.isRequired
};

export default function ChannelGrid(props) {
  let channels =  props.channels.map((channel) => {
    let channelProps = {
      key: channel.id,
      channel: channel,
      currentBeat: props.currentBeat,
      onRemove: props.onRemove.bind(null, channel)
    };
    return <ChannelWrapperCom {...channelProps} />;
  });
  return <div>{channels}</div>;
};

import React from 'react';
import ChannelWrapperComponent from './channel-wrapper';
import store from 'app/store';

export default function ChannelGrid(props) {
  let channels =  props.channels.map((channel) => {
    let channelProps = {
      key: channel.id,
      channel: channel,
      bindTo: channel,
      record: store.recordFor(channel),
      currentBeat: props.currentBeat,
      onRemove: props.onRemove.bind(null, channel)
    };
    return <ChannelWrapperComponent {...channelProps} />;
  });
  return <div>{channels}</div>;
};

ChannelGrid.propTypes = {
  channels: React.PropTypes.array.isRequired,
  currentBeat: React.PropTypes.number.isRequired
};

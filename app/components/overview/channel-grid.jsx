import React from 'react';
import ChannelWrapperComponent from './channel-wrapper';
import store from 'app/store';

export default function(props) {
  let channels =  props.channels.map((channel) => {
    let channelProps = {
      key: channel.id,
      model: channel,
      bindTo: channel,
      record: store.recordFor(channel),
      currentBeat: props.currentBeat,
      onRemove: props.onRemove.bind(null, channel)
    };
    return <ChannelWrapperComponent {...channelProps} />;
  });
  return <div>{channels}</div>;
};

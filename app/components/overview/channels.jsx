import React from 'react';
import ChannelComponent from 'components/sequencer/channel';
import store from 'app/store';

export default function(props) {
  let channels =  props.channels.map((channel) => {
    let channelProps = {
      key: channel.id,
      model: channel,
      bindTo: channel,
      record: store.recordFor(channel),
      currentBeat: props.currentBeat,
      tuner: 'gain',
      onRemove: props.onRemove.bind(null, channel)
    };
    return <ChannelComponent {...channelProps} />;
  });
  return (<div>{channels}</div>);
};

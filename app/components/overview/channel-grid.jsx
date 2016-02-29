import React from 'react';
import store from 'globals/store';
import ChannelWrapperCom from './channel-wrapper';
import TempoBarCom from './tempo-bar';

ChannelGrid.propTypes = {
  channels: React.PropTypes.array.isRequired,
  currentBeat: React.PropTypes.number.isRequired
};

export default function ChannelGrid(props) {

  // Sort channels by time created
  let records = props.channels.map((c) => store.recordFor(c));
  let sorted = records.sort((a, b) => {
    let diff = a.state.time_created - b.state.time_created;
    return diff / Math.abs(diff);
  }).map((c) => store.objectFor(c));

  let channels = sorted.map((channel) => {
    let channelProps = {
      key: channel.id,
      channel: channel,
      onRemove: () => props.onRemove(channel)
    };
    return <ChannelWrapperCom {...channelProps} />;
  });

  return (
    <div className="channel-grid">
      <TempoBarCom beat={props.currentBeat} />
      {channels}
    </div>
  );

};

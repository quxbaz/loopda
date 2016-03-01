import React from 'react';
import ChannelWrapperCom from './channel-wrapper';
import TempoBarCom from './tempo-bar';

ChannelGrid.propTypes = {
  channels: React.PropTypes.array.isRequired,
  currentBeat: React.PropTypes.number.isRequired
};

export default function ChannelGrid(props) {

  // Sort channels by time created
  let sorted = [...props.channels].sort((a, b) => {
    let diff = a.state.time_created - b.state.time_created;
    return diff / Math.abs(diff);
  });

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

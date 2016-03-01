import React from 'react';
import ChannelWrapperCom from './channel-wrapper';
import TempoBarCom from './tempo-bar';
import MasterChannelCom from './master-channel';

ChannelGrid.propTypes = {
  channels: React.PropTypes.array.isRequired,
  beats: React.PropTypes.number.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  soloMode: React.PropTypes.bool.isRequired,
  onRemove: React.PropTypes.func
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
      soloMode: props.soloMode,
      onRemove: () => props.onRemove(channel)
    };
    return <ChannelWrapperCom {...channelProps} />;
  });

  return (
    <div className="channel-grid">
      {channels.length > 0 ? <TempoBarCom beat={props.currentBeat} /> : ''}
      <MasterChannelCom beats={props.beats} channels={props.channels} />
      {channels}
    </div>
  );

};

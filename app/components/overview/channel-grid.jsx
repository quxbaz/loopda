import React from 'react';
import ChannelWrapperCom from './channel-wrapper';
import TempoBarCom from './tempo-bar';
import MasterChannelCom from './master-channel';
import ArchivedChannelCom from './archived-channel';

ChannelGrid.propTypes = {
  sequencer: React.PropTypes.object.isRequired,
  beats: React.PropTypes.number.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  soloMode: React.PropTypes.bool.isRequired,
};

export default function ChannelGrid(props) {

  let {sequencer, soloMode, beats, currentBeat} = props;
  let {channels} = sequencer.state;

  // Sort channels by time created
  let sorted = [...channels].sort((a, b) => {
    let diff = a.state.time_created - b.state.time_created;
    return diff / Math.abs(diff);
  });

  let channelComs = sorted.map((channel) => {
    if (channel.state.archived)
      return <ArchivedChannelCom key={channel.id} sequencer={sequencer} channel={channel} />;
    else {
      let channelProps = {
        key: channel.id,
        channel,
        soloMode
      };
      return <ChannelWrapperCom {...channelProps} />;
    }
  });

  return (
    <div className="channel-grid">
      <MasterChannelCom beats={beats} channels={channels} />
      <div className="relative">
        {channels.length > 0 ? <TempoBarCom beat={currentBeat} /> : ''}
        {channelComs}
      </div>
    </div>
  );

};

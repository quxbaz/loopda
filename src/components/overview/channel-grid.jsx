import React from 'react';
import ChannelHelper from 'helpers/channel';
import ChannelWrapper from './channel-wrapper';
import TempoBar from './tempo-bar';
import MasterChannel from './master-channel';
import ArchivedChannel from './archived-channel';

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
  let sorted = ChannelHelper.sorted(channels);

  let channelComs = sorted.map((channel) => {
    if (channel.state.archived)
      return <ArchivedChannel key={channel.cid} sequencer={sequencer} channel={channel} />;
    else {
      let channelProps = {
        key: channel.cid,
        channel,
        soloMode
      };
      return <ChannelWrapper {...channelProps} />;
    }
  });

  return (
    <div className="channel-grid">
      <MasterChannel beats={beats} channels={channels} />
      <div className="relative">
        {channels.length > 0 ? <TempoBar beat={currentBeat} /> : ''}
        {channelComs}
      </div>
    </div>
  );

};

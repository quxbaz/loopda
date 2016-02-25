/*
  Overview component
*/

import React from 'react';
import SequencerCtrl from 'controllers/sequencer/sequencer';
import ChannelGridCom from './channel-grid';
import ChannelMenuCom from './channel-menu';

Overview.propTypes = {
  sequencer: React.PropTypes.object
};

export default function Overview(props) {

  let {sequencer} = props;
  let {playing, channels, currentBeat} = sequencer.state;

  let togglePlay = () => SequencerCtrl.togglePlay(sequencer);
  let addChannel = (sampleName) => SequencerCtrl.createChannel(sequencer, sampleName);
  let removeChannel = (channel) => SequencerCtrl.removeChannel(sequencer, channel);

  return (
    <div className="overview">
      <a className="togglePlay" onClick={togglePlay}>
        {playing ? 'pause' : 'play'}
      </a>
      <div>
        # Channels: {channels.length}
      </div>
      <ChannelMenuCom onClickOption={addChannel} />
      <ChannelGridCom channels={channels} currentBeat={currentBeat} onRemove={removeChannel} />
    </div>
  );

};

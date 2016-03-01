/*
  Overview component
*/

import React from 'react';
import SequencerCtrl from 'controllers/sequencer/sequencer';
import SequencerHelper from 'helpers/sequencer';
import ChannelGridCom from './channel-grid';
import ChannelMenuCom from './channel-menu';

Overview.propTypes = {
  sequencer: React.PropTypes.object
};

export default function Overview(props) {

  let {sequencer} = props;
  let {beats, playing, channels, currentBeat} = sequencer.state;

  let togglePlay = () => SequencerCtrl.togglePlay(sequencer);
  let addChannel = (sampleName) => SequencerCtrl.createChannel(sequencer, sampleName);
  let removeChannel = (channel) => SequencerCtrl.removeChannel(sequencer, channel);

  let gridProps = {
    channels,
    beats,
    currentBeat,
    soloMode: SequencerHelper.soloMode(sequencer),
    onRemove: removeChannel
  };

  return (
    <div className="overview">
      <a className="togglePlay" onClick={togglePlay}>
        {playing ? 'pause' : 'play'}
      </a>
      <div>
        # Channels: {channels.length}
      </div>
      <ChannelMenuCom onClickOption={addChannel} />
      <ChannelGridCom {...gridProps} />
    </div>
  );

};

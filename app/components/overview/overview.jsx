/*
  Overview component
*/

import React from 'react';
import SequencerCtrl from 'controllers/sequencer/sequencer';
import SequencerHelper from 'helpers/sequencer';
import ChannelGrid from './channel-grid';
import ChannelMenu from './channel-menu';

Overview.propTypes = {
  sequencer: React.PropTypes.object
};

export default function Overview(props) {

  let {sequencer} = props;
  let {beats, playing, channels, currentBeat} = sequencer.state;

  let togglePlay = () => SequencerCtrl.togglePlay(sequencer);
  let addChannel = (sampleName) => SequencerCtrl.createChannel(sequencer, sampleName);

  let gridProps = {
    sequencer,
    beats,
    currentBeat,
    soloMode: SequencerHelper.soloMode(sequencer)
  };

  return (
    <div className="overview">
      <div>
        <a href="/#/preset">presets</a>
      </div>
      <a className="togglePlay" onClick={togglePlay}>
        {playing ? 'pause' : 'play'}
      </a>
      <div>
        # Channels: {channels.length}
      </div>
      <ChannelMenu onClickOption={addChannel} />
      <ChannelGrid {...gridProps} />
    </div>
  );

};

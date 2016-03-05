/*
  Overview component
*/

import React from 'react';
import SequencerCtrl from 'controllers/sequencer/sequencer';
import SequencerHelper from 'helpers/sequencer';
import ChannelGrid from './channel-grid';
import ChannelMenu from './channel-menu';

Overview.propTypes = {
  sequencer: React.PropTypes.object,
  presets: React.PropTypes.array.isRequired
};

export default function Overview(props) {

  let {sequencer, presets} = props;
  let {beats, playing, channels, currentBeat} = sequencer.state;

  let togglePlay = () => SequencerCtrl.togglePlay(sequencer);
  let addChannel = (preset) => SequencerCtrl.createChannel(sequencer, preset);

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
      <div>
        <a onClick={() => localStorage.clear()}>localStorage.clear()</a>
      </div>
      <a className="togglePlay" onClick={togglePlay}>
        {playing ? 'pause' : 'play'}
      </a>
      <div>
        # Channels: {channels.length}
      </div>
      <ChannelMenu presets={presets} onSelect={addChannel} />
      <ChannelGrid {...gridProps} />
    </div>
  );

};

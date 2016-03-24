/*
  Overview component
*/

import React from 'react';
import classNames from 'classnames';
import SequencerCtrl from 'controllers/sequencer/sequencer';
import SequencerHelper from 'helpers/sequencer';
import ChannelGrid from './channel-grid';
import ChannelMenu from './channel-menu';

Overview.propTypes = {
  sequencer: React.PropTypes.object,
  presets: React.PropTypes.array.isRequired,
  songMode: React.PropTypes.bool
};

export default function Overview(props) {

  let {sequencer, presets, songMode} = props;
  let {beats, playing, channels, currentBeat} = sequencer.state;

  let togglePlay = () => SequencerCtrl.togglePlay(sequencer);
  let addChannel = (preset) => SequencerCtrl.createChannel(sequencer, preset);

  let gridProps = {
    sequencer,
    beats,
    currentBeat,
    soloMode: SequencerHelper.soloMode(sequencer),
    songMode
  };

  let className = classNames({
    overview: true,
    'song-mode': songMode
  });

  return (
    <div className={className}>
      <div><a href="/#/preset">presets</a></div>
      <div><a href="/#/sequencer/editor">song mode</a></div>
      <div>
        <a onClick={() => localStorage.clear()}>localStorage.clear()</a>
      </div>
      <a className="togglePlay" onClick={togglePlay}>
        {playing ? 'pause' : 'play'} (space)
      </a>
      <div>
        # Channels: {channels.length}
      </div>
      <ChannelMenu presets={presets} onSelect={addChannel} />
      <ChannelGrid {...gridProps} />
    </div>
  );

};

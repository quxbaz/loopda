/*
  Overview component
*/

import React from 'react';
import sequencerCtrl from 'controllers/sequencer/sequencer';
import ChannelGridCom from './channel-grid';
import ChannelMenuCom from './channel-menu';

Overview.propTypes = {
  sequencer: React.PropTypes.object
};

export default function Overview(props) {

  let {sequencer} = props;
  let {playing, channels, currentBeat} = sequencer.state;

  let togglePlay = sequencerCtrl.togglePlay.bind(null, sequencer);
  let addChannel = sequencerCtrl.createChannel.bind(null, sequencer);
  let removeChannel = sequencerCtrl.removeChannel.bind(null, sequencer);

  return (
    <div className="sequencer">
      <a className="togglePlay" onClick={togglePlay}>
        {playing ? 'pause' : 'play'}
      </a>
      <hr />
      <div className="channels">
        <ChannelGridCom channels={channels} currentBeat={currentBeat} onRemove={removeChannel} />
        <ChannelMenuCom onClickOption={addChannel} />
        <div className="spacer"></div>
      </div>
    </div>
  );

};

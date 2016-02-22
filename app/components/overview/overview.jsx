/*
  Overview component
*/

import React from 'react';
import sequencerCtrl from 'controllers/sequencer/sequencer';
import ChannelGridComponent from './channel-grid';
import SampleOptionsComponent from './sample-options';

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
        <ChannelGridComponent channels={channels} currentBeat={currentBeat}
                              onRemove={removeChannel} />
        <div className="add-channel">
          <div>&nbsp;</div>
          <div className="inner">
            <h4>Add a channel</h4>
            <SampleOptionsComponent onClickOption={addChannel} />
          </div>
        </div>
        <div className="spacer"></div>
      </div>
    </div>
  );

};

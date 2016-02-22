import React from 'react';
import {route} from 'globals/router';
import store from 'globals/store';
import SequencerCom from 'components/sequencer/sequencer';
import ChannelDetailCom from 'components/channel-detail/channel-detail';

route('/sequencer/channel/:id', {
  resource(id) {
    return store.get('channel', id).then((channel) => {
      return [app.sequencer, store.objectFor(channel)];
    });
  },
  render([sequencer, channel]) {
    let {currentBeat} = sequencer.state;
    return (
      <SequencerCom sequencer={sequencer}>
        <ChannelDetailCom channel={channel} currentBeat={currentBeat} />
      </SequencerCom>
    );
  }
});

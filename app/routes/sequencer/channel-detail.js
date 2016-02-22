import React from 'react';
import {route} from 'globals/router';
import store from 'globals/store';
import SequencerComponent from 'components/sequencer/sequencer';
import ChannelDetailComponent from 'components/channel-detail/channel-detail';

route('/sequencer/channel/:id', {
  resource(id) {
    return store.get('channel', id).then((record) => {
      return [app.sequencer, store.objectFor(record), record];
    });
  },
  render([sequencer, channel, channelRecord]) {
    let props = {
      channel,
      record: channelRecord,
      currentBeat: sequencer.state.currentBeat
    };
    return (
      <SequencerComponent sequencer={sequencer}>
        <ChannelDetailComponent {...props} />
      </SequencerComponent>
    );
  }
});

import React from 'react';
import {route} from 'app/router';
import store from 'app/store';
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
      bindTo: channel,
      currentBeat: sequencer.state.currentBeat
    };
    return (
      <SequencerComponent sequencer={sequencer} bindTo={sequencer}>
        <ChannelDetailComponent {...props} />
      </SequencerComponent>
    );
  }
});

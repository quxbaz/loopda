import React from 'react';
import {route} from 'globals/router';
import store from 'globals/store';
import Sequencer from 'components/sequencer/sequencer';
import ChannelDetail from 'components/channel-detail/channel-detail';

route('/sequencer/channel/:id', {
  resource(id) {
    Promise.resolve([]);
    // return store.get('channel', id).then((channel) => {
    //   return [app.sequencer, store.objectFor(channel)];
    // });
  },
  render([sequencer, channel]) {
    return (
      <Sequencer sequencer={sequencer}>
        <ChannelDetail channel={channel} />
      </Sequencer>
    );
  }
});

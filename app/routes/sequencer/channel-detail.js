import React from 'react';
import {route} from 'app/router';
import store from 'app/store';
import SequencerComponent from 'components/sequencer/sequencer';
import ChannelDetailComponent from 'components/sequencer/channel-detail';

route('/sequencer/channel/:id', {
  resource(id) {
    return store.get('channel', id).then((record) => {
      return [app.sequencer, record, store.objectFor(record)];
    });
  },
  render([sequencer, record, model]) {
    let props = {
      model,
      record,
      bindTo: model,
      currentBeat: app.sequencer.state.currentBeat
    };
    return (
      <SequencerComponent model={sequencer} bindTo={sequencer}>
        <ChannelDetailComponent {...props} />
      </SequencerComponent>
    );
  }
});

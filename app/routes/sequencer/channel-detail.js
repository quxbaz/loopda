import React from 'react';
import {route} from 'app/router';
import store from 'app/store';
import ChannelDetailComponent from 'components/sequencer/channel-detail';

route('/channel/:id', {
  resource(id) {
    return store.get('channel', id);
  },
  render(record) {
    let model = store.objectFor(record);
    return <ChannelDetailComponent model={model} record={record} />;
  }
});

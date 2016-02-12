import React from 'react';
import ReactDOM from 'react-dom';
import {setRoute} from 'app/router';
import store from 'app/store';
import ChannelDetailComponent from 'components/sequencer/channel-detail';

setRoute('/channel/:id', {
  on: (id) => {
    store.get('channel', id).then((record) => {
      let model = store.objectFor(record);
      ReactDOM.render(<ChannelDetailComponent model={model} record={record} />, $app);
    });
  },
  after: () => {
    // cleanup
  }
});

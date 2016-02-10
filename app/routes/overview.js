import {setRoute} from 'app/router';
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'app/store';
import AppComponent from 'components/app';
import pending from 'pending';

function startSavingRecords(interval=1000) {
  // Auto-saves all records record every n interval
  store.one('sequencer').then((record) => {
    setInterval(() => {
      pending(saveRecords(record));
    }, interval);
  });
}

function* saveRecords(sequencerRecord) {
  sequencerRecord.save();
  let channels = yield sequencerRecord.get('channels');
  for (let channel of channels) {
    channel.save();
    let blips = yield channel.get('blips')
    blips.forEach((blip) => blip.save());
  }
}

setRoute('/overview', {
  on: () => {
    ReactDOM.render(<AppComponent model={app} />, $app);
    startSavingRecords();
    app.sequencer.play();
  },
  after: () => {
    // Cleanup
  }
});

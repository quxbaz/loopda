import {setRoute} from 'app/router';
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'app/store';
import AppComponent from 'components/app';
import pending from 'pending';

function startSavingRecords(sequencerRecord, interval=1000) {
  // Auto-saves all records record every n interval
  setInterval(() => {
    pending(saveRecords(sequencerRecord));
  }, interval);
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
    store.alwaysOne('sequencer').then((sequencerRecord) => {
      ReactDOM.render(<AppComponent model={app} record={sequencerRecord} />, $app);
      startSavingRecords(sequencerRecord);
      app.sequencer.play();
    });
  },
  after: () => {
    // cleanup
  }
});

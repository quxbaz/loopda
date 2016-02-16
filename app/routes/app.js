import React from 'react';
import {router, route} from 'app/router';
import pending from 'pending';
import store from 'app/store';
import {without} from 'lib/util';
import AppComponent from 'components/app';

function startSavingRecords(sequencerRecord, interval=1000) {
  // Auto-saves all records every n interval
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

// <TODO> Find some way to clean this mess up.

function* mapRecords([sequencers, channels, blips]) {
  let sequencerRecord = yield store.alwaysOne('sequencer')
  store.map(app.sequencer, sequencerRecord);
  mapChannels(app.sequencer, channels, blips);
}

function mapChannels(sequencer, channelRecords, blipRecords) {
  channelRecords.forEach((channelRecord) => {
    let channel = sequencer.addChannel(without(channelRecord.state, ['id', 'blips']));
    store.map(channel, channelRecord);
    let blipMatches = blipRecords.filter(blipRecord => blipRecord.belongsTo(channelRecord));
    mapBlips(channel, channelRecord, channel.state.blips, blipMatches);
  });
}

function mapBlips(channel, channelRecord, blips, blipRecords) {
  blips.forEach((blip, i) => {
    let blipRecord = blipRecords.find(record => record.state.beat === i);
    if (blipRecord) {
      channel.setBlip(i, blipRecord.state);
    } else {
      blipRecord = store.createRecord('blip', blip.state);
      blipRecord.attachTo(channelRecord);
    }
    store.map(blip, blipRecord);
  });
}

route('app', {
  resource() {
    return store.all(['sequencer', 'channel', 'blip']);
  },
  setup(recordLists) {
    return pending(mapRecords(recordLists)).then(() => {
      return store.one('sequencer');
    }).then((sequencerRecord) => {
      startSavingRecords(sequencerRecord);
    });
  },
  render() {
    return <AppComponent router={router} model={app} />;
  }
});

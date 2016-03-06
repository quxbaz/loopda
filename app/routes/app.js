import React from 'react';
import {router, route} from 'globals/router';
import store from 'globals/store';
import watcher from 'globals/watcher';
import {names} from 'globals/samples';
import pending from 'pending';
import {without} from 'lib/util';
import App from 'components/app';

function initPresets(presets) {
  if (presets.length > 0) {
    for (let preset of presets)
      watcher.include(preset)
  } else {
    names.forEach((sample) => {
      let preset = store.createRecord('preset', {
        title: sample,
        sample
      });
      preset.save();
      watcher.include(preset);
    });
  }
}

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
  app.sequencer.setState(without(sequencerRecord.state, ['id', 'channels']));
  mapChannels(app.sequencer, channels, blips);
}

function mapChannels(sequencer, channelRecords, blipRecords) {
  channelRecords.forEach((channelRecord) => {
    let preset = channelRecord.take('preset');
    let channel = sequencer.addChannel(
      Object.assign(
        without(channelRecord.state, ['id', 'blips']),
        {preset}
      )
    );
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
      blipRecord.setState({channel: channelRecord});
    }
    store.map(blip, blipRecord);
  });
}

route('app', {
  resource() {
    return store.all(['preset', 'sequencer', 'channel', 'blip']);
  },
  setup([presets, ...recordLists]) {
    initPresets(presets);
    return pending(mapRecords(recordLists)).then(() =>
      store.one('sequencer')
    ).then((sequencerRecord) => {
      startSavingRecords(sequencerRecord);
    });
  },
  render() {
    return <App router={router} />;
  }
});

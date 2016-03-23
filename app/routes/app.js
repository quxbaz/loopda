import React from 'react';
import {router, route} from 'globals/router';
import store from 'globals/store';
import {names} from 'globals/samples';
import App from 'components/app';

// Presets manager record
let manager = store.Manager.create({presets: []});
manager._dontPersist = true;

// Song editor record
let editor = store.Editor.create({songs: []});
editor._dontPersist = true;

// Create default presets.
function initPresets(presets) {
  if (presets.length !== 0)
    return;
  names.forEach((sample) => {
    let mixable = store.Mixable.create();
    let preset = store.Preset.create({
      title: sample,
      sample,
      mixable
    });
    mixable.save().then(() => {
      preset.save();
    });
  });
}

function loadSequencer(sequencers) {
  if (sequencers.length > 0) {
    app.sequencer.record = sequencers[0];
    app.sequencer.setState(sequencers[0].state);
  } else {
    app.sequencer.record = store.Sequencer.create();
    app.sequencer.record.save();
  }
}

function loadChannels(channels) {
  channels.forEach((record) => {
    let channel = app.sequencer.addChannel(record.state);
    channel.record = record;
  });
}

function loadBlips() {
  app.sequencer.state.channels.forEach((channel) => {
    channel.record.take('blips').forEach((record) => {
      let blip = channel.state.blips[record.state.beat];
      blip.record = record;
      blip.setState(record.state);
    });
  });
}

route('app', {
  resource() {
    return store.all(['mixable', 'song']).then(([mixables, songs]) => {
      songs.forEach((song) => {
        song.setState({editor});
      });
      return store.all(['preset', 'sequencer', 'channel', 'blip'])
    });
  },
  setup([presets, sequencers, channels]) {
    initPresets(presets);
    loadSequencer(sequencers);
    loadChannels(channels);
    loadBlips();
  },
  render() {
    return <App router={router} />;
  }
});

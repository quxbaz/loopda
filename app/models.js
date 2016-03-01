import {attr, hasMany, belongsTo} from 'store/lib/relations';

let initialized = false;

export let initModels = (store) => {

  if (initialized)
    return;
  initialized = true;

  store.registerModel('sequencer', '/sequencer/', {
    id: attr(),
    playing: attr(),
    currentBeat: attr(),
    beats: attr(),
    beatDuration: attr(),
    channels: hasMany('channel')
  });

  store.registerModel('channel', '/channel/', {
    id: attr(),
    title: attr(),
    beats: attr(),
    mute: attr(),
    solo: attr(),
    sampleName: attr(),
    color: attr(),
    time_created: attr(),
    sequencer: belongsTo('sequencer'),
    blips: hasMany('blip'),
  });

  store.registerModel('blip', '/blip/', {
    id: attr(),
    beat: attr(),
    sampleName: attr(),
    mute: attr(),
    duration: attr(),
    offset: attr(),
    gain: attr(),
    rate: attr(),
    channel: belongsTo('channel')
  });

};

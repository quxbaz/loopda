import {attr, hasMany, belongsTo} from 'store/lib/relations';

let initialized = false;

export let initModels = (store) => {

  if (initialized)
    return;
  initialized = true;

  store.registerModel('sequencer', '/sequencer/', {
    playing: attr(),
    currentBeat: attr(),
    beats: attr(),
    beatDuration: attr(),
    channels: hasMany('channel')
  });

  store.registerModel('channel', '/channel/', {
    beats: attr(),
    mute: attr(),
    sampleName: attr(),
    sequencer: belongsTo('sequencer'),
    blips: hasMany('blips')
  });

  store.registerModel('blip', '/blip/', {
    sampleName: attr(),
    mute: attr(),
    duration: attr(),
    offset: attr(),
    gain: attr(),
    rate: attr(),
    channel: belongsTo('channel')
  });

};

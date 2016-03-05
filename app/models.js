import {attr, hasOne, hasMany, belongsTo} from 'store/lib/relations';

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
    number: attr(),
    title: attr(),
    beats: attr(),
    solo: attr(),
    mute: attr(),
    sampleName: attr(),
    color: attr(),
    time_created: attr(),
    archived: attr(),
    sequencer: belongsTo('sequencer'),
    preset: hasOne('preset'),
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

  store.registerModel('preset', '/preset/', {
    id: attr(),
    title: attr(),
    sample: attr(),

    /*
      mixable props
    */

    gain: attr(1),
    minGain: attr(0),
    maxGain: attr(10),

    rate: attr(1),
    minRate: attr(0),
    maxRate: attr(4)

  });

};

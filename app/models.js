import {hasMany, belongsTo} from 'store/lib/relations';

let initialized = false;

export let initModels = (store) => {

  if (initialized)
    return;
  initialized = true;

  store.registerModel('sequencer', '/sequencer/', {
    channels: hasMany('channel')
  });

  store.registerModel('channel', '/channel/', {
    sequencer: belongsTo('sequencer'),
    blips: hasMany('blips')
  });

  store.registerModel('blip', '/blip/', {
    channel: belongsTo('channel')
  });

};

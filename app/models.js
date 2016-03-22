import {attr, hasOne, hasMany, belongsTo} from 'store/lib/relations';

let initialized = false;

export let initModels = (store) => {

  if (initialized)
    return;
  initialized = true;

  store.define('sequencer', {
    schema: {
      id: attr(),
      playing: attr(),
      currentBeat: attr(),
      beats: attr(),
      beatDuration: attr(),
      channels: hasMany('channel')
    }
  });

  store.define('channel', {
    schema: {
      id: attr(),
      number: attr(),
      title: attr(),
      beats: attr(),
      solo: attr(),
      mute: attr(),
      sample: attr(),
      color: attr(),
      time_created: attr(),
      archived: attr(),
      sequencer: belongsTo('sequencer'),
      preset: belongsTo('preset'),
      blips: hasMany('blip')
    }
  });

  store.define('blip', {
    schema: {
      id: attr(),
      beat: attr(),
      sample: attr(),
      mute: attr(),
      unmixed: attr(),
      channel: belongsTo('channel'),
      mixable: hasOne('mixable')
    }
  });

  store.define('preset', {
    schema: {
      id: attr(),
      title: attr(),
      sample: attr(),
      channels: hasMany('channel'),
      mixable: hasOne('mixable')
    }
  });

  store.define('mixable', {
    schema: {
      id: attr(),
      // duration: attr(0),
      // offset: attr(0),
      gain: attr(1),
      minGain: attr(0),
      maxGain: attr(10),
      rate: attr(1),
      minRate: attr(0),
      maxRate: attr(4)
    }
  });

  store.define('manager', {
    schema: {
      presets: attr()
    }
  });

  store.define('editor', {
    schema: {
      songs: hasMany('song')
    }
  });

  store.define('song', {
    schema: {
      editor: belongsTo('editor'),
      title: attr(),
      data: attr(() => [])
    }
  });

};

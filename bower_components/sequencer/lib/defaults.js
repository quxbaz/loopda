export let sequencerDefaults = {
  playing: false,
  currentBeat: -1,
  beats: 16,
  beatDuration: 200,
  channels: []
};

export let channelDefaults = {
  beats: 16,
  mute: false,
  sample: ''
};

export let blipDefaults = {
  beat: undefined,
  sample: '',
  mute: false,
  duration: 0,
  offset: 0,
  minOffset: 0,
  maxOffset: 3600,  // 60 seconds
  gain: 1,
  minGain: 0,
  maxGain: 10,
  rate: 1,
  minRate: 0,
  maxRate: 4
};

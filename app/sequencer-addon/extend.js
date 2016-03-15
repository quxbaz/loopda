import Base from 'sequencer/lib/base';
import {Sequencer, Channel} from 'sequencer';
import {sequencerDefaults, channelDefaults, blipDefaults} from 'sequencer/lib/defaults';
import {watch} from 'globals/watcher';

// Set sequencer defaults
Object.assign(sequencerDefaults, {
  playing: true,
  beatDuration: 110
});

Object.assign(channelDefaults, {
  title: '',
  solo: false,
  color: '#ff00ff',
  archived: false
});

Object.assign(blipDefaults, {
  unmixed: true
});

/*
  Allow interfacing with sequencer objects as if they were records.
*/

Base.prototype.save = function() {
  return this.record.save(this.state);
};

Base.prototype.destroy = function() {
  return this.record.destroy();
};

Base.prototype.take = function(...args) {
  return this.record.take(...args);
};

// Watch all sequencer objects
Base.on('new', watch);

/*
  <Warning> Dirty pattern going on here. We're modifying the internals
  of an library. It alters Channel to allow blips to play when @solo
  is true.
*/
Channel.prototype.playBeat = function(beat) {
  let {archived, solo, mute} = this.state;
  if (!archived && (solo || !mute))
    this.state.blips[beat].play();
}

/*
  channel.js
*/

import {uniqId} from './util';
import stateful from './stateful';
import Blip from './blip';

function objectDefaults() {
  let blips = [];
  for (let i=0; i < 32; i++)
    blips.push(new Blip({beat: i, mute: true}));
  return {blips};
}

export let defaults = {
  beats      : 32,
  mute       : false,
  sampleName : ''
};

export default class Channel {

  constructor(state, props={}) {
    this.id = uniqId();
    this.setState(Object.assign(objectDefaults(), defaults, state));
    this.props = props;
    this.state.blips.forEach((blip) => {
      if (!blip.state.sampleName)
        blip.setState({sampleName: this.state.sampleName});
      blip.props.onPlay = props.onPlay;
    });
  }

  setBlip(beat, state) {
    this.state.blips[beat].setState(state);
    return this;
  }

  playBeat(beat) {
    if (!this.state.mute)
      this.state.blips[beat].play();
  }

}

Object.assign(Channel.prototype, stateful.mixin);

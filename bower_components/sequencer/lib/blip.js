/*
  blip.js
*/

import {assign} from './util';
import {Stateful} from './stateful';

export let defaults = {
  beat       : undefined,
  sampleName : '',
  mute       : false,
  duration   : 0,
  offset     : 0,
  minOffset  : 0,
  maxOffset  : 3600,  // 60 seconds
  gain       : 1,
  minGain    : 0,
  maxGain    : 10,
  rate       : 1,
  minRate    : 0,
  maxRate    : 4
};

export default class Blip extends Stateful {

  constructor(state={}, props={}) {
    super(assign({}, defaults, state));
    this.props = props;
  }

  validateState(newState) {
    newState.gain = Math.min(newState.gain, newState.maxGain);
    newState.gain = Math.max(newState.gain, newState.minGain);
    newState.rate = Math.min(newState.rate, newState.maxRate);
    newState.rate = Math.max(newState.rate, newState.minRate);
    return newState;
  }

  play() {
    this.props.onPlay(this.state);
  }

}

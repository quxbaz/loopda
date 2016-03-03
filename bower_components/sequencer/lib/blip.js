/*
  blip.js
*/

import {assign} from './util';
import Stateful from 'stateful';
import {blipDefaults} from './defaults';

export default class Blip extends Stateful {

  constructor(state={}, props={}) {
    super(assign({}, blipDefaults, state));
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

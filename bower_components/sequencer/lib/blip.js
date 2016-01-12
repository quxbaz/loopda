/*
  blip.js
*/

import stateful from './stateful';

function defaultState() {
  return {

    sampleName : '',
    mute       : false,
    duration   : 200,
    offset     : 0,

    gain       : 1,
    minGain    : 0,
    maxGain    : 10,

    rate       : 1,
    minRate    : 0.05,
    maxRate    : 4,

  };
}

function mixinComputedStates(state) {
  Object.defineProperty(state, 'gainScale', {
    get: () => (state.gain - state.minGain) / (state.maxGain - state.minGain)
  });
  Object.defineProperty(state, 'rateScale', {
    get: () => (state.rate - state.minRate) / (state.maxRate - state.minRate)
  });
};

export default class Blip {

  constructor(state, props={}) {
    this.setState(Object.assign(defaultState(), state));
    mixinComputedStates(this.state);
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

Object.assign(Blip.prototype, stateful.mixin);

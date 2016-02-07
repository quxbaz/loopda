/*
  channel.js
*/

import {Stateful} from './stateful';
import {assign} from './util';
import Blip from './blip';
import {channelDefaults} from './defaults';

function makeBlips() {
  let blips = [];
  for (let i=0; i < 32; i++)
    blips.push(new Blip({beat: i, mute: true}));
  return blips;
}

export default class Channel extends Stateful {

  constructor(state={}, props={}) {
    super(assign({blips: makeBlips()}, channelDefaults, state));
    this.props = props;
    this.state.blips.forEach((blip) => {
      blip.props.onPlay = props.onPlay;
      if (!blip.state.sampleName)
        blip.setState({sampleName: this.state.sampleName});
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

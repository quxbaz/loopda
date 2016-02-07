/*
  sequencer.js
*/

import {assign} from './util';
import {Stateful} from './stateful';
import Channel from './channel';
import Timer from 'bower_components/timer.js/timer';

export let defaults = {
  playing      : false,
  currentBeat  : -1,
  beats        : 32,
  beatDuration : 200,
  channels     : []
}

export default class Sequencer extends Stateful {

  constructor(state={}, props={}) {
    super(assign({}, defaults, state));
    this.props = props;
    this.timer = new Timer({tickInterval: this.state.beatDuration});
    this.timer.on('tick', () => {
      if (this.state.playing)
        this.tick();
    });
    this.timerStarted = false;
  }

  play() {
    this.setState({playing: true});
    if (!this.timerStarted) {
      this.timer.start();
      this.timerStarted = true;
    }
  }

  pause() {
    this.setState({playing: false});
  }

  tick() {
    /*
      Plays a beat and moves onto the next one.
    */
    this.advanceBeat();
    this.playCurrentBeat();
  }

  playCurrentBeat() {
    for (let channel of this.state.channels)
      channel.playBeat(this.state.currentBeat);
  }

  advanceBeat() {
    this.setState({
      currentBeat: (this.state.currentBeat + 1) % this.state.beats
    });
  }

  addChannel(state={}) {
    let channel = new Channel(state, {
      onPlay: blipState => this.trigger('playBlip', blipState)
    });
    this.setState({
      channels: this.state.channels.concat(channel)
    });
    return channel;
  }

}

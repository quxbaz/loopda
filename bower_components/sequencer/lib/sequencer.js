/*
  sequencer.js

  <Usage>
  let sequencer = new Sequencer();
  sequencer.play();
*/

import Sentry from 'sentry';
import {uniqId} from './util';
import stateful from './stateful';
import Channel from './channel';
import Timer from 'bower_components/timer.js/timer';

export let defaults = {
  playing      : false,
  currentBeat  : -1,
  beats        : 32,
  beatDuration : 200,
  channels     : []
}

export default class Sequencer {

  constructor(state, props={}) {
    this.id = uniqId();
    this.setState(Object.assign({}, defaults, state));
    this.props = props;
    this.sentry = new Sentry();
    this.timer = new Timer({tickInterval: this.state.beatDuration});
    this.timer.on('tick', () => {
      if (this.state.playing)
        this.tick();
    });
    this.timerStarted = false;
  }

  on(...args) {
    this.sentry.on(...args);
    return this;
  }

  trigger(...args) {
    this.sentry.trigger(...args);
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
      onPlay: blipState => this.trigger('play-blip', blipState)
    });
    this.setState({
      channels: this.state.channels.concat(channel)
    });
    return channel;
  }

}

Object.assign(Sequencer.prototype, stateful.mixin);

/*
  sequencer.js

  <Usage>

  let sequencer = new Sequencer();
  sequencer.play();

  <TODO>
  - Move this file to /lib.
  - Create file called index.
  - export this, audioservice, blip, and channel from index.
*/

import stateful from './stateful';
import Channel from './channel';
import Timer from 'bower_components/timer.js/timer';
import Dispatcher from 'bower_components/dispatcher/dispatcher';

function defaultState() {
  return {
    playing: false,
    currentBeat: -1,
    beatDuration: 200,
    channels: []
  };
}

export default class Sequencer {

  constructor(state, props={}) {
    this.setState(Object.assign(defaultState(), state));
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
      currentBeat: (this.state.currentBeat + 1) % 16
    });
  }

  addChannel(state={}) {
    let channel = new Channel(state, {
      onPlay: blipState => this.publish('play-blip', blipState)
    });
    this.setState({
      channels: this.state.channels.concat(channel)
    });
    return channel;
  }

}

let dispatcher = new Dispatcher();
Object.assign(Sequencer.prototype, stateful.mixin, {
  subscribe : dispatcher.subscribe.bind(dispatcher),
  publish   : dispatcher.publish.bind(dispatcher)
});

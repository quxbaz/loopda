import React from 'react';
import ReactDOM from 'react-dom';
import {loadAudioSamples} from 'audio/audiohelper';
import sampleList from 'audio/samplelist';
import {Sequencer, AudioService} from 'sequencer';
import SequencerComponent from 'components/sequencer/sequencer';

let AppComponent = React.createClass({
  render() {
    return (
      <SequencerComponent model={this.props.sequencer}
       sampleNames={Object.keys(sampleList)} />
    );
  }
});

export default class App {

  constructor() {
    this.sequencer = new Sequencer({beatDuration: 100});

    // <TESTING>
    this.sequencer.addChannel({sampleName: 'hihat'});

    this.audioContext = new AudioContext();
    this.audioService = new AudioService(this.audioContext);
    this.sequencer.subscribe('play-blip', (blipState) => {
      this.audioService.playBlip(blipState);
    });
  }

  init() {
    return loadAudioSamples(this.audioContext, sampleList).then((sampleMap) => {
      this.audioService.sampleMap = sampleMap;
    });
  }

  start() {
    this.sequencer.play();
    ReactDOM.render(
      <AppComponent sequencer={this.sequencer} />,
      document.getElementById('app-container')
    );
  }

}

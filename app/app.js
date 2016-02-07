import 'controllers/imports';
import sampleList from 'audio/samplelist';
import {loadAudioSamples} from 'audio/audiohelper';
import {Sequencer} from 'sequencer';
import audioContext from './audiocontext';
import audioService from './audioservice';
import {blipDefaults} from 'sequencer/lib/defaults';
import AppWire from 'wires/app';

let beatDuration = 100;
blipDefaults.minOffset = 0;
blipDefaults.maxOffset = beatDuration;

export default class App {

  constructor() {
    this.sequencer = new Sequencer({beatDuration});
    this.sequencer.on('playBlip', (blipState) => {
      audioService.playBlip(blipState);
    });
  }

  init() {
    return loadAudioSamples(audioContext, sampleList).then((sampleMap) => {
      audioService.sampleMap = sampleMap;
    });
  }

  start() {
    let wire = new AppWire({app: this});
    wire.start();
    this.sequencer.play();
  }

}

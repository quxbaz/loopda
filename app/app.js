// Declarations
import 'routes/imports';

// CSS stuff
import {computeStyles} from 'globals/style-constants';

// Audio stuff
import samples from 'globals/samples';
import {loadAudioSamples} from 'audio/audiohelper';
import audioContext from 'globals/audiocontext';
import audioService from 'globals/audioservice';

// Sequencer
import {Sequencer} from 'sequencer';
import SequencerHelper from 'helpers/sequencer';
import 'sequencer-addon/extend';

// Router
import {router} from 'globals/router';

// Declare globals
window.$app = document.getElementById('app-container');

export default class App {

  constructor() {
    window.app = this;  // Set app to global property
    this.createSequencer();
  }

  createSequencer() {
    let sequencer = new Sequencer();
    this.sequencer = sequencer;
    sequencer.on('playBlip', (blipState, channel) => {
      if (blipState.unmixed)
        blipState = Object.assign({}, blipState, channel.take('preset').state);
      if (SequencerHelper.soloMode(sequencer)) {
        if (channel.state.solo)
          audioService.playBlip(blipState);
      } else
        audioService.playBlip(blipState);
    });
  }

  init() {
    return Promise.all([
      loadAudioSamples(audioContext, samples).then((sampleMap) => {
        audioService.sampleMap = sampleMap;
      })
    ]).then(computeStyles);
  }

  start() {
    router.start();
  }

}

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

// Misc
import {pick} from 'lib/util';

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
    sequencer.on('playBlip', (blip, channel) => {
      let playState = Object.assign(
        pick(blip.state, ['sample', 'mute']),
        blip.take('mixable').state
      );
      if (SequencerHelper.soloMode(sequencer)) {
        if (channel.state.solo)
          audioService.playBlip(playState);
      } else
        audioService.playBlip(playState);
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

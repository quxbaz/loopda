// Declarations
import 'routes/imports';

// CSS stuff
import {computeStyles} from 'globals/style-constants';

// Audio stuff
import sampleList from 'audio/samplelist';
import {loadAudioSamples} from 'audio/audiohelper';
import audioContext from 'globals/audiocontext';
import audioService from 'globals/audioservice';

// Sequencer
import {Sequencer} from 'sequencer';
import {sequencerDefaults, blipDefaults} from 'sequencer/lib/defaults';

// Router
import {router} from 'globals/router';

// Declare globals
window.$app = document.getElementById('app-container');

// Set sequencer defaults
let beatDuration = 100;
sequencerDefaults.playing = true;
blipDefaults.minOffset = 0;
blipDefaults.maxOffset = beatDuration;

export default class App {

  constructor() {
    window.app = this;  // Set app to global property
    this.sequencer = new Sequencer({beatDuration});
    this.sequencer.on('playBlip', (blipState) => {
      audioService.playBlip(blipState);
    });
  }

  init() {
    return Promise.all([
      loadAudioSamples(audioContext, sampleList).then((sampleMap) => {
        audioService.sampleMap = sampleMap;
      })
    ]).then(computeStyles);
  }

  start() {
    router.start();
  }

}

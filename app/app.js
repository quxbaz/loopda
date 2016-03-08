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
import {Channel} from 'sequencer';
import {sequencerDefaults, /*blipDefaults*/} from 'sequencer/lib/defaults';

// Router
import {router} from 'globals/router';

// Declare globals
window.$app = document.getElementById('app-container');

// Set sequencer defaults
sequencerDefaults.playing = true;
// blipDefaults.minOffset = 0;
// blipDefaults.maxOffset = beatDuration;

/*
  <Warning> Dirty pattern going on here. We're modifying the internals
  of an library. It alters Channel to allow blips to play when @solo
  is true.
*/
Channel.prototype.playBeat = function(beat) {
  let {archived, solo, mute} = this.state;
  if (!archived && (solo || !mute))
    this.state.blips[beat].play();
}

export default class App {

  constructor() {
    window.app = this;  // Set app to global property
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

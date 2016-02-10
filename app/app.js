// Definitions
import 'controllers/imports';
import 'routes/imports';

// Audio stuff
import sampleList from 'audio/samplelist';
import {loadAudioSamples} from 'audio/audiohelper';
import audioContext from './audiocontext';
import audioService from './audioservice';

// Sequencer
import {Sequencer} from 'sequencer';
import {blipDefaults} from 'sequencer/lib/defaults';

// Data
import store from './store';

// Router
import {startRouter} from './router';

// Misc libs
import pending from 'pending';
import {without} from 'lib/util';

// Globals
window.$app = document.getElementById('app-container');

// Set sequencer defaults
let beatDuration = 100;
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

  fetchRecords() {
    return store.all(['sequencer', 'channel', 'blip']);
  }

  *mapRecords([sequencers, channels, blips]) {
    let sequencerRecord = yield store.alwaysOne('sequencer')
    store.map(this.sequencer, sequencerRecord);
    this.mapChannels(this.sequencer, channels, blips);
  }

  mapChannels(sequencer, channelRecords, blipRecords) {
    channelRecords.forEach((channelRecord) => {
      let channel = sequencer.addChannel(without(channelRecord.state, 'id'));
      store.map(channel, channelRecord);
      let blipMatches = blipRecords.filter(blipRecord => blipRecord.belongsTo(channelRecord));
      this.mapBlips(channel, channelRecord, channel.state.blips, blipMatches);
    })
  }

  mapBlips(channel, channelRecord, blips, blipRecords) {
    blips.forEach((blip, i) => {
      let blipRecord = blipRecords.find(record => record.state.beat === i);
      if (blipRecord) {
        channel.setBlip(i, blipRecord.state);
      } else {
        blipRecord = store.createRecord('blip', blip.state);
        blipRecord.attachTo(channelRecord);
      }
      store.map(blip, blipRecord);
    });
  }

  init() {
    return Promise.all([
      this.fetchRecords().then((allRecords) => {
        return pending(this.mapRecords(allRecords));
      }),
      loadAudioSamples(audioContext, sampleList).then((sampleMap) => {
        audioService.sampleMap = sampleMap;
      })
    ]);
  }

  start() {
    startRouter();
  }

}

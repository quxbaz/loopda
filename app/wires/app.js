import React from 'react';
import ReactDOM from 'react-dom';
import store from 'app/store';
import Wire from 'lib/wire';
import AppComponent from 'components/app';
import {without} from 'lib/util';
import pending from 'pending';

export default class AppWire extends Wire {

  fetch() {
    return store.all(['sequencer', 'channel', 'blip']);
  }

  ready([sequencers, channels, blips]) {

    let record = sequencers.length === 1 ?
      sequencers[0] :
      store.createRecord('sequencer');

    let sequencer = this.props.app.sequencer;
    store.map(sequencer, record);

    channels.forEach((channelRecord) => {

      let channel = sequencer.addChannel(without(channelRecord.state, 'id'));
      store.map(channel, channelRecord);

      let matches = blips.filter(
        blipRecord => blipRecord.state.channel === channelRecord.state.id
      );

      channel.state.blips.forEach((blip, i) => {
        let blipRecord = matches.find(record => record.state.beat === i);
        if (blipRecord) {
          channel.setBlip(i, blipRecord.state);
        } else {
          blipRecord = store.createRecord('blip', blip.state);
          blipRecord.attachTo(channelRecord);
        }
        store.map(blip, blipRecord);
      });

    });

    this.startSaveRecords(record);

    ReactDOM.render(
      <AppComponent model={this.props.app} />,
      document.getElementById('app-container')
    );

  }

  startSaveRecords(root, interval=1000) {
    // Auto-saves all records from a root record every n interval
    setInterval(() => {
      pending(this.saveRecords(root));
    }, interval);
  }

  *saveRecords(root) {
    root.save();
    let channels = yield root.get('channels');
    for (let channel of channels) {
      channel.save();
      let blips = yield channel.get('blips')
      blips.forEach((blip) => blip.save());
    }
  }

}

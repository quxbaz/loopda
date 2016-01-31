import React from 'react';
import ReactDOM from 'react-dom';
import store from 'app/store';
import Wire from 'lib/wire';
import Controller from 'lib/controller';
import AppController from 'controllers/app';
import AppComponent from 'components/app';
import {filterMap} from 'lib/util';

export default class AppWire extends Wire {

  fetch() {
    return Promise.all([
      store.all('sequencer'),
      store.all('channel'),
      store.all('blip')
    ]);
  }

  ready([sequencers, channels, blips]) {

    let record = sequencers.length === 1 ?
      sequencers[0] :
      store.createRecord('sequencer');

    let ctrl = new AppController({
      parent: null,
      model: this.props.app
    });

    let sequencer = this.props.app.sequencer;

    let sequencerCtrl = new Controller({
      parent: ctrl,
      model: sequencer,
      record
    });

    ctrl.addChild(sequencerCtrl);

    let channelCtrls = filterMap(channels, (channelRecord) => {
      if (channelRecord.state.sequencer === record.state.id) {
        let channelModel = sequencer.addChannel(channelRecord.state);
        return new Controller({
          parent: sequencerCtrl,
          model: channelModel,
          record: channelRecord
        });
      }
    });

    sequencerCtrl.addChildren(channelCtrls);

    ReactDOM.render(
      <AppComponent ctrl={ctrl} />,
      document.getElementById('app-container')
    );

  }

}

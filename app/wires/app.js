import React from 'react';
import ReactDOM from 'react-dom';
import store from 'app/store';
import Wire from 'lib/wire';
import AppComponent from 'components/app';
import {without} from 'lib/util';

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

    let sequencer = this.props.app.sequencer;
    store.map(sequencer, record);

    channels.forEach((channelRecord) => {
      let model = sequencer.addChannel(without(channelRecord.state, 'id'));
      store.map(model, channelRecord);
    });

    ReactDOM.render(
      <AppComponent model={this.props.app} />,
      document.getElementById('app-container')
    );

  }

}

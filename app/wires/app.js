import React from 'react';
import ReactDOM from 'react-dom';
import store from 'app/store';
import Wire from 'lib/wire';
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

    let sequencer = this.props.app.sequencer;

    ReactDOM.render(
      <AppComponent ctrl={ctrl} />,
      document.getElementById('app-container')
    );

  }

}

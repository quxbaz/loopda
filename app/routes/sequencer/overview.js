import React from 'react';
import {route} from 'globals/router';
import store from 'globals/store';
import Sequencer from 'components/sequencer/sequencer';
import Overview from 'components/overview/overview';

route('/sequencer/overview', {
  resource() {
    return store.all('preset').then((presets) =>
      [app.sequencer, presets]
    );
  },
  render([sequencer, presets]) {
    return (
      <Sequencer sequencer={sequencer}>
        <Overview presets={presets} />
      </Sequencer>
    );
  }
});

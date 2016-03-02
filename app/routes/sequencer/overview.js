import React from 'react';
import {route} from 'globals/router';
import Sequencer from 'components/sequencer/sequencer';
import Overview from 'components/overview/overview';

route('/sequencer/overview', {
  resource() {
    return Promise.resolve(app.sequencer);
  },
  render(sequencer) {
    return (
      <Sequencer sequencer={sequencer}>
        <Overview />
      </Sequencer>
    );
  }
});

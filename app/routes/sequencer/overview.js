import {route} from 'globals/router';
import React from 'react';
import SequencerComponent from 'components/sequencer/sequencer';
import OverviewComponent from 'components/overview/overview';

route('/sequencer/overview', {
  resource() {
    return Promise.resolve(app.sequencer);
  },
  render(sequencer) {
    return (
      <SequencerComponent sequencer={sequencer}>
        <OverviewComponent />
      </SequencerComponent>
    );
  }
});

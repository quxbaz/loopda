import {route} from 'globals/router';
import React from 'react';
import SequencerCom from 'components/sequencer/sequencer';
import OverviewCom from 'components/overview/overview';

route('/sequencer/overview', {
  resource() {
    return Promise.resolve(app.sequencer);
  },
  render(sequencer) {
    return (
      <SequencerCom sequencer={sequencer}>
        <OverviewCom />
      </SequencerCom>
    );
  }
});

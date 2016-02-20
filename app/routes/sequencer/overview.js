import {route} from 'app/router';
import React from 'react';
import OverviewComponent from 'components/overview/overview';

route('/sequencer/overview', {
  resource() {
    return Promise.resolve(app.sequencer);
  },
  render(sequencer) {
    return <OverviewComponent sequencer={sequencer} />;
  }
});

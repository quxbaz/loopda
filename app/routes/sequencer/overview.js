import {route} from 'app/router';
import React from 'react';
import OverviewComponent from 'components/overview/overview';

route('/sequencer/overview', {
  setup() {
    app.sequencer.play();
  },
  render() {
    return <OverviewComponent sequencer={app.sequencer} />;
  },
  cleanup() {
    app.sequencer.pause();
  }
});

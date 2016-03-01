import {route, router} from 'globals/router';
import store from 'globals/store';

route('/sequencer', {
  resource() {
    return Promise.all([
      store.one('sequencer'),
      app.sequencer
    ]);
  },
  setup([record, sequencer]) {
    if (record.state.playing)
      sequencer.play();
  },
  redirect() {
    return '/sequencer/overview';
  },
  cleanup([record, sequencer]) {
    // sequencer.pause();
  }
});

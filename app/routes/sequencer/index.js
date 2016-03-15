import {route} from 'globals/router';
import store from 'globals/store';

route('/sequencer', {
  resource() {
    return Promise.resolve(app.sequencer);
  },
  setup(sequencer) {
    if (sequencer.state.playing)
      sequencer.play();
  },
  redirect() {
    return '/sequencer/overview';
  }
});

import {route, router} from 'globals/router';

route('/sequencer', {
  resource() {
    return Promise.resolve(app.sequencer);
  },
  setup(sequencer) {
    sequencer.play();
  },
  redirect() {
    return '/sequencer/overview';
  },
  cleanup(sequencer) {
    sequencer.pause();
  }
});

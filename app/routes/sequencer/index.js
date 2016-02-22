import {route, router} from 'globals/router';

route('/sequencer', {
  // resource() {
  //   return store.one('sequencer').then;
  // },
  setup(sequencer) {
    // store.objectFor(sequencer).play();
  },
  redirect() {
    return '/sequencer/overview';
  },
  cleanup(sequencer) {
    // sequencer.pause();
  }
});

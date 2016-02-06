import actions from 'actions/sequencer/blip';
import {toggleState} from 'lib/util';
import store from 'app/store';

export default {

  [actions.toggleMute]: function(blip) {
    toggleState(blip, 'mute');
    store.recordFor(blip).save(blip.state);
  }

};

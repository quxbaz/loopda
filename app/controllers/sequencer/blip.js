import actions from 'actions/sequencer/blip';
import {toggleState} from 'lib/util';

export default {

  [actions.toggleMute]: function(blip) {
    toggleState(blip, 'mute');
  }

};

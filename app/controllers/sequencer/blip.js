import {toggleState} from 'lib/util';

export default {

  toggleMute(blip) {
    toggleState(blip, 'mute');
  }

};

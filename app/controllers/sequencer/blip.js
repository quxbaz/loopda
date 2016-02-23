import {toggleState} from 'lib/util';

export default {

  playBlip(blip) {
    blip.play();
  },

  setBlipState(blip, state) {
    blip.setState(state);
  },

  toggleMute(blip) {
    toggleState(blip, 'mute');
  }

};

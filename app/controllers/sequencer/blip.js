import constants from 'actions/blip/constants';
import {toggleState} from 'lib/util';
import store from 'app/store';

export default {

  toggleMute(payload) {
    if (payload.actionType === constants.TOGGLE_MUTE) {
      let {blip} = payload;
      toggleState(blip, 'mute');
      store.recordFor(blip).save(blip.state);
    }
  }

};

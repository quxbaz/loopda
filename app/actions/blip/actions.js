import dispatcher from 'app/dispatcher';
import constants from './constants';

export default {

  toggleMute(blip) {
    dispatcher.dispatch({
      actionType: constants.TOGGLE_MUTE,
      blip
    });
  }

};

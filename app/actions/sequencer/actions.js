import dispatcher from 'app/dispatcher';
import constants from './constants';

export default {

  createChannel(sequencer, sampleName) {
    dispatcher.dispatch({
      actionType: constants.CREATE_CHANNEL,
      sequencer,
      sampleName
    });
  },

  removeChannel(sequencer, channel) {
    dispatcher.dispatch({
      actionType: constants.REMOVE_CHANNEL,
      sequencer,
      channel
    });
  }

};

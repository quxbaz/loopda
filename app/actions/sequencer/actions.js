import dispatcher from 'app/dispatcher';
import constants from './constants';

export default {

  createChannel(data) {
    dispatcher.dispatch({
      actionType: constants.CREATE_CHANNEL,
      sampleName: data.sampleName,
      sequencer: data.sequencer
    });
  }

};

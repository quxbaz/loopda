import store from 'app/store';
import dispatcher from 'app/dispatcher';
import constants from 'actions/sequencer/constants';
import {each} from 'lib/util';

let callbacks = {

  createChannel(payload) {
    if (payload.actionType === constants.CREATE_CHANNEL) {
      let {sampleName, sequencer} = payload;
      sequencer.addChannel({sampleName});
      // store.createRecord('channel').attachTo(record);
    }
  }

}

each(callbacks, (fn) => dispatcher.register(fn));

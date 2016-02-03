import store from 'app/store';
import dispatcher from 'app/dispatcher';
import constants from 'actions/sequencer/constants';
import {each} from 'lib/util';

let callbacks = {

  createChannel(payload) {
    if (payload.actionType === constants.CREATE_CHANNEL) {
      let {sequencer, sampleName} = payload;
      sequencer.addChannel({sampleName});
      // store.createRecord('channel').attachTo(record);
    }
  },

  removeChannel(payload) {
    if (payload.actionType === constants.REMOVE_CHANNEL) {
      let {sequencer, channel} = payload;
      let {channels} = sequencer.state;
      sequencer.setState({
        channels: channels.filter(el => el !== channel)
      });
    }
  }

}

each(callbacks, (fn) => dispatcher.register(fn));

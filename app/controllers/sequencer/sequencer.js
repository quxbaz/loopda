import store from 'app/store';
import dispatcher from 'app/dispatcher';
import constants from 'actions/sequencer/constants';
import {without, each} from 'lib/util';

let callbacks = {

  createChannel(payload) {
    if (payload.actionType === constants.CREATE_CHANNEL) {
      let {sequencer, sampleName} = payload;
      let channel = sequencer.addChannel({sampleName});
      let record = store.createRecord('channel', channel.state);
      record.attachTo(store.recordFor(sequencer));
      record.save();
      store.map(channel, record);
    }
  },

  removeChannel(payload) {
    if (payload.actionType === constants.REMOVE_CHANNEL) {
      let {sequencer, channel} = payload;
      let {channels} = sequencer.state;
      sequencer.setState({
        channels: channels.filter(el => el !== channel)
      });
      store.recordFor(channel).destroy();
    }
  }

}

each(callbacks, (fn) => dispatcher.register(fn));

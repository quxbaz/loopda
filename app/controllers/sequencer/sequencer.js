import store from 'app/store';
import constants from 'actions/sequencer/constants';

export default {

  createChannel(payload) {
    if (payload.actionType === constants.CREATE_CHANNEL) {
      let {sequencer, sampleName} = payload;
      // Create and save channel record.
      let channel = sequencer.addChannel({sampleName});
      let channelRecord = store.createRecord('channel', channel.state);
      channelRecord.attachTo(store.recordFor(sequencer));
      channelRecord.save();
      store.map(channel, channelRecord);
      // Create blip records.
      channel.state.blips.forEach((blip) => {
        let blipRecord = store.createRecord('blip', blip.state);
        blipRecord.attachTo(channelRecord);
        store.map(blip, blipRecord);
      });
    }
  },

  removeChannel(payload) {
    if (payload.actionType === constants.REMOVE_CHANNEL) {
      let {sequencer, channel} = payload;
      let {channels} = sequencer.state;
      sequencer.setState({
        channels: channels.filter(el => el !== channel)
      });
      let channelRecord = store.recordFor(channel);
      channelRecord.get('blips').then((blipRecords) => {
        blipRecords.forEach(record => record.destroy());
      });
      channelRecord.destroy();
    }
  }

};

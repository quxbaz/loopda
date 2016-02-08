import store from 'app/store';
import actions from 'actions/sequencer/sequencer';

export default {

  [actions.createChannel]: function(sequencer, sampleName) {
    // Create and save channel record.
    let channel = sequencer.addChannel({sampleName});
    let channelRecord = store.createRecord('channel', channel.state, channel);
    channelRecord.attachTo(store.recordFor(sequencer));
    channelRecord.save();
    // Create blip records.
    channel.state.blips.forEach((blip) => {
      let blipRecord = store.createRecord('blip', blip.state, blip);
      blipRecord.attachTo(channelRecord);
    });
  },

  [actions.removeChannel]: function(sequencer, channel) {
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

};

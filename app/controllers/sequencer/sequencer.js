import store from 'globals/store';
import {randomChannelHSL} from 'lib/util';

export default {

  togglePlay(sequencer) {
    if (sequencer.state.playing)
      sequencer.pause()
    else
      sequencer.play();
  },

  createChannel(sequencer, sampleName) {
    // Create new channel
    let channel = sequencer.addChannel({sampleName});
    let channelRecord = store.createRecord(
      'channel',
      Object.assign({}, channel.state, {
        title: sampleName,
        color: randomChannelHSL()
      }),
      channel
    );
    channelRecord.attachTo(store.recordFor(sequencer));
    // Create blip records and attach to new channel record
    channel.state.blips.forEach((blip) => {
      let blipRecord = store.createRecord('blip', blip.state, blip);
      blipRecord.attachTo(channelRecord);
    });
  },

  removeChannel(sequencer, channel) {
    let {channels} = sequencer.state;
    sequencer.setState({
      channels: channels.filter(el => el !== channel)
    });
    let channelRecord = store.recordFor(channel);
    // Destroy blip records
    channelRecord.get('blips').then((blipRecords) => {
      blipRecords.forEach(record => record.destroy());
    });
    // Destroy channel record
    channelRecord.destroy();
  }

};

import store from 'globals/store';
import {randomChannelHSL, time} from 'lib/util';
import SequencerHelper from 'helpers/sequencer';
import ChannelHelper from 'helpers/channel';

export default {

  togglePlay(sequencer) {
    if (sequencer.state.playing)
      sequencer.pause()
    else
      sequencer.play();
  },

  createChannel(sequencer, sampleName) {
    // Create new channel
    let channel = sequencer.addChannel({
      sampleName,
      number: SequencerHelper.newChannelNumber(sequencer.state.channels),
      title: sampleName,
      solo: false,
      color: ChannelHelper.randomChannelHSL(),
      time_created: time()
    });
    let channelRecord = store.createRecord('channel', channel.state, channel);
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

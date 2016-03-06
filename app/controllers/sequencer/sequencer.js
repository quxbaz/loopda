import store from 'globals/store';
import {assign, pick, randomChannelHSL, time} from 'lib/util';
import SequencerHelper from 'helpers/sequencer';
import ChannelHelper from 'helpers/channel';
import mixables from 'globals/mixables';

export default {

  togglePlay(sequencer) {
    if (sequencer.state.playing)
      sequencer.pause()
    else
      sequencer.play();
  },

  createChannel(sequencer, preset) {

    let channel = sequencer.addChannel({
      number: SequencerHelper.newChannelNumber(sequencer.state.channels),
      title: preset.state.title,
      solo: false,
      mute: false,
      sample: preset.state.sample,
      color: ChannelHelper.randomChannelHSL(),
      time_created: time(),
      archived: false,
      preset
    });

    let channelRecord = store.createRecord('channel', channel.state, channel);
    channelRecord.attachTo(store.recordFor(sequencer));

    // Create blip records and attach to new channel record
    channel.state.blips.forEach((blip) => {
      blip.setState(
        assign({unmixed: true}, pick(preset.state, mixables))
      );
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

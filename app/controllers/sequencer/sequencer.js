import store from 'globals/store';
import {without, randomChannelHSL, now} from 'lib/util';
import SequencerHelper from 'helpers/sequencer';
import ChannelHelper from 'helpers/channel';

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
      sample: preset.state.sample,
      color: ChannelHelper.randomChannelHSL(),
      time_created: now()
    });

    channel.record = store.Channel.create({
      sequencer: sequencer.record,
      preset
    });

    let mixable = channel.take('preset').take('mixable');

    // Create blip records and attach to new channel record
    channel.state.blips.forEach((blip, i) => {
      blip.record = store.Blip.create({
        channel: channel.record,
        mixable
      });
    });

    // Channel needs an id before blips can save their relation to it
    channel.save().then(() => {
      channel.state.blips.forEach((blip) => {
        blip.save();
      });
    });

  },

  removeChannel(sequencer, channel) {
    let {channels} = sequencer.state;
    sequencer.setState({
      channels: channels.filter(el => el !== channel)
    });
    channel.destroy();
    channel.state.blips.forEach((blip) => {
      blip.destroy();
    });
  }

};

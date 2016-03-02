import {router} from 'globals/router';
import store from 'globals/store';
import {toggleState} from 'lib/util';

export default {

  viewChannelDetail(channel) {
    let record = store.recordFor(channel);
    let id = record.state.id || record.cid;
    router.nav('/sequencer/channel/' + id);
  },

  toggleMute(channel) {
    toggleState(channel, 'mute');
  },

  toggleSolo(channel) {
    toggleState(channel, 'solo');
  },

  archive(channel) {
    channel.setState({
      solo: false,
      archived: true
    });
  },

  restore(channel) {
    channel.setState({archived: false});
  }

};

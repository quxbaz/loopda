import {router} from 'globals/router';
import store from 'globals/store';
import {toggleState} from 'lib/util';

export default {

  toggleMute(channel) {
    toggleState(channel, 'mute');
  },

  viewChannelDetail(channel) {
    let record = store.recordFor(channel);
    let id = record.state.id || record.cid;
    router.nav('/sequencer/channel/' + id);
  }

};

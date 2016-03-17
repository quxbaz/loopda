import {router} from 'globals/router';
import {toggleState} from 'lib/util';

export default {

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

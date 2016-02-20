import actions from 'actions/sequencer/channel';
import {router} from 'app/router';
import store from 'app/store';

export default {

  [actions.viewChannelDetail]: function(channel) {
    let record = store.recordFor(channel);
    let id = record.state.id || record.cid;
    router.nav('/sequencer/channel/' + id);
  }

};

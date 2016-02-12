import actions from 'actions/sequencer/channel';
import {router} from 'app/router';
import store from 'app/store';

export default {

  [actions.viewChannel]: function(channel) {
    let record = store.recordFor(channel);
    let id = record.state.id || record.cid;
    router().setRoute('/channel/' + id);
  }

};

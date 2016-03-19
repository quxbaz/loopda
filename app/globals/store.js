import Store from 'store';
import LSAdapter from 'store/lib/adapters/ls/adapter';
import {initModels} from 'app/models';
import {watch} from './watcher';

let store = new Store({adapter: new LSAdapter()});
initModels(store);

let doNotWatch = ['sequencer', 'channel', 'blip'];

// Watch all non-sequencer records
store.on('addRecord', (record) => {
  let {name} = record.props.model;
  if (!doNotWatch.includes(name))
    watch(record);
});

export default store;

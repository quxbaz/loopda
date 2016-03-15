import Store from 'store';
import LSAdapter from 'store/lib/adapters/ls/adapter';
import {initModels} from 'app/models';
import {watch} from './watcher';

let store = new Store({adapter: new LSAdapter()});
initModels(store);

// Watch all non-sequencer records
store.on('addRecord', (record) => {
  let {name} = record.props.model;
  if (!['sequencer', 'channel', 'blip'].includes(name))
    watch(record);
});

export default store;

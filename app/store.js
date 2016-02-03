import Store from 'store';
import LSAdapter from 'store/lib/adapters/ls/adapter';
import {initModels} from './models';

let store = new Store({
  adapter: new LSAdapter()
});

initModels(store);

let map = new WeakMap();
store.map = (model, record) => map.set(model, record);
store.recordFor = (model) => map.get(model);

export default store;

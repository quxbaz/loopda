import Store from 'store';
import LSAdapter from 'store/lib/adapters/ls/adapter';
import {initModels} from './models';

let store = new Store({
  adapter: new LSAdapter()
});

initModels(store);

export default store;

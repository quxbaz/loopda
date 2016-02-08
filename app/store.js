import Store from 'store';
import LSAdapter from 'store/lib/adapters/ls/adapter';
import {initModels} from './models';

class MappedStore extends Store {

  constructor(...args) {
    super(...args);
    this._map = new WeakMap();
  }

  map(object, record) {
    // Maps an object to a record
    this._map.set(object, record);
  }

  recordFor(object) {
    return this._map.get(object);
  }

  createRecord(modelName, state, objectToMap) {
    let record = super.createRecord(modelName, state);
    if (objectToMap !== undefined)
      this.map(objectToMap, record);
    return record;
  }

}

let store = new MappedStore({adapter: new LSAdapter()});
initModels(store);

export default store;

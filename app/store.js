import Store from 'store';
import LSAdapter from 'store/lib/adapters/ls/adapter';
import {initModels} from './models';

class MappedStore extends Store {

  constructor(...args) {
    super(...args);
    this._map = new WeakMap();
    this._reverseMap = new WeakMap();
  }

  map(object, record) {
    // Maps an object to a record and mirror changes.
    this._map.set(object, record);
    this._reverseMap.set(record, object);
    object.on('change', () => {
      record.setState(object.state);
    });
  }

  recordFor(object) {
    return this._map.get(object);
  }

  objectFor(record) {
    return this._reverseMap.get(record);
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

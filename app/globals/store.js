import Store from 'store';
import LSAdapter from 'store/lib/adapters/ls/adapter';
import {initModels} from 'app/models';
import watcher from 'globals/watcher';

class MappedStore extends Store {

  constructor(...args) {
    super(...args);
    this._map = new WeakMap();
    this._reverseMap = new WeakMap();
  }

  map(object, record) {
    /*
      Maps an object to a record and mirror changes. Also trigger any
      changes on the global watcher when any model changes.
    */
    this._map.set(object, record);
    this._reverseMap.set(record, object);
    object.on('change', () => {
      record.setState(object.state);
      watcher.trigger('change');
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

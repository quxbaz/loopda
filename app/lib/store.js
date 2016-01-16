/*
  store.js

  <Usage>

  // There should usually only be one of these.
  let store = new Store();

  store.registerModel('Person', {
    id       : undefined,     // No default
    name     : 'John Doe',    // Default name
    age      : undefined,
    children : []
  });

  // Retrieving
  store.get('person', 42);
  store.all('person').then(...)

  // Creating records
  let bob = store.createRecord('person', {name: 'Bob'});
  bob.get('name') => 'Bob'

  <TODO>
  Unit tests
*/

class Record {

  constructor(modelName, store, props={}) {
    this.modelName = modelName;
    this.store = store;
    this._props = props;
  }

  get(prop) {
    return this._props[prop];
  }

  set(key, val) {
    /*
      Sets a property or collection of properties. Can take either
      (key, val) or a map of properties.
    */
    if (typeof key === 'string')
      this._props[key] = val;
    else if (typeof key === 'object')
      Object.assign(this._props, key);
  }

  save(props) {
    /*
      Applies an adapter to save the record to some source (ie,
      server, localstorage, cookies, etc.)
    */
  }

  destroy() {
    /*
      Applies an adapter to destory the record from some source.
    */
    this.store.destroyRecord(this.modelName, this);
  }

}

export default class Store {

  constructor() {
    this.models = {};
  }

  registerModel(modelName, map={}) {
    /*
      Registers a model.
      @modelName: What you want to call the model.
      @map: A map of this model's default properties.
    */
    if (this.models.hasOwnProperty(modelName))
      throw Error(`Model "${modelName}" already exists.`);

    this.models[modelName] = {
      map,
      records: []
    }
  }

  createRecord(modelName, props={}) {
    /*
      Instantiates a record and returns it.
      @props: Properties to assign the record.
    */
    let model = this.models[modelName];
    props = Object.assign({}, model.map, props);
    let record = new Record(modelName, this, props);
    model.records.push(record);
    return record;
  }

  destroyRecord(modelName, record) {
    let records = this.models[modelName].records;
    let i = records.indexOf(record);
    records.splice(i, 1);
  }

  get(modelName, id) {
    /*
      Gets a record given an id. Throws an error if no record is found.
    */
    if (typeof id === 'undefined')
      throw Error('You must provide an id.');
    let record = this.models[modelName].records.find(
      record => record.get('id') == id
    );
    if (typeof record === 'undefined')
      throw Error('Model does not exist.');
    return record;
  }

  all(modelName) {
    /*
      Gets all records of a type.
    */
    return this.models[modelName].records;
  }

}

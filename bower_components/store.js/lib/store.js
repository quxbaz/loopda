/*
  store.js

  <API>
  store.registerModel(name, url, schema={})
  store.createRecord(modelName, state={})
  store.get(modelName, id)
  store.all(modelName)

*/

import Model from './model';
import {byId} from './util';

export default class Store {

  constructor(props={}) {
    this.props = props;
    if (!props.adapter)
      throw new Error('You must provide an adapter.');
    this.models = {};
    this._cache = {};   // Records cache
    // Flags set to true when all records of a model have been
    // fetched. Keyed by model name.
    this.fetchedAll = {};
  }

  registerModel(name, url, schema={}) {
    if (this.models.hasOwnProperty(name))
      throw new Error(`Model "${name}" already exists.`);
    this.models[name] = new Model(name, url, schema, {store: this});
    this._cache[name] = new Set();
  }

  get(modelName, id) {
    if (this.models[modelName] === undefined)
      throw new Error('Model @' + modelName + ' is not registered.');
    if (id === undefined)
      throw new Error('You must provide an id.');
    let hit = this.searchCache(modelName, id);
    if (hit)
      return Promise.resolve(hit);
    let model = this.models[modelName];
    return this.props.adapter.read(model, id).then(
      data => this.createRecord(modelName, data, true),
      (error) => {
        throw new Error(error);
      }
    );
  }

  all(modelName) {
    if (Array.isArray(modelName)) {
      return Promise.all(modelName.map(
        (modelName) => this.all(modelName)
      ));
    }
    if (this.models[modelName] === undefined)
      throw new Error('Model @' + modelName + ' is not registered.');
    if (arguments.length > 1)
      throw new Error('@all takes only 1 argument.');
    if (this.fetchedAll[modelName])
      return Promise.resolve(Array.from(this._cache[modelName]));
    let model = this.models[modelName];
    return this.props.adapter.read(model).then(
      (dataList) => {
        this.fetchedAll[modelName] = true;
        return dataList.map((data) => {
          let record = this.searchCache(modelName, data.id);
          if (record)
            return record;
          else
            return this.createRecord(modelName, data, true);
        });
      }, (error) => {
        throw new Error(error);
      }
    ).then((records) => {
      let allRecords = new Set(records);
      // This includes non-persisted records.
      for (let record of this._cache[modelName])
        allRecords.add(record);
      return Array.from(allRecords);
    });
  }

  one(modelName) {
    /*
      Fetches a single model. If the request returns more than a
      single model, an error is thrown.
    */
    return this.all(modelName).then((records) => {
      if (records.length === 0)
        return Promise.reject('No records found.');
      else if (records.length > 1)
        return Promise.reject('Only expected a single record.');
      return records[0];
    });
  }

  createRecord(modelName, state={}, cache=true) {
    let record = this.models[modelName].createRecord(state);
    if (cache)
      this.cache(record);
    return record;
  }

  saveRecord(record) {
    if (record.state.id)
      return this.props.adapter.update(record);
    else
      return this.props.adapter.create(record);
  }

  destroyRecord(record) {
    if (record.state.id) {
      return this.props.adapter.delete(record).then((resp) => {
        let {name} = record.props.model;
        this._cache[name].delete(record);
        return resp;
      });
    } else {
      // Resolve immediately because this resource doesn't exist on
      // the server and nothings need to be done.
      return Promise.resolve();
    }
  }

  cache(record) {
    let model = record.props.model;
    this._cache[model.name].add(record);
  }

  searchCache(modelName, id) {
    return Array.from(this._cache[modelName]).find(byId(id));
  }

}

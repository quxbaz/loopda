/*
  Model class
*/

import Record from './record';
import {Relation} from './relations';
import {each} from './util';

export default class Model {

  constructor(name, url, schema={}, props={}) {
    this.name = name;
    this.url = this.validateUrl(url);
    this.schema = this.validateSchema(schema);
    this.props = props;
  }

  validateUrl(url) {
    if (url === undefined)
      throw "You must provide a url.";
    // url must begin and end with a slash.
    let first = url[0];
    let last = url[url.length-1];
    if (first === '/' && last === '/')
      return url;
    throw new Error('@url must begin and end with a forward slash.');
  }

  validateSchema(schema) {
    Object.keys(schema).forEach((key) => {
      if (!(schema[key] instanceof Relation))
        throw new Error('Schema relation must be of type Relation.');
    });
    return schema;
  }

  createRecord(state) {
    let defaults = {};
    each(this.schema, (val, key) => {
      if (val.defaultValue !== undefined)
        defaults[key] = val.defaultValue;
    });
    state = Object.assign(defaults, state);
    return new Record(state, {
      model: this,
      store: this.props.store
    });
  }

}

/*
  LocalStorage server.
*/

import Bin from 'bin.js';
import {uuid} from 'store/lib/util';

export default class {

  constructor() {
    this.bin = new Bin({parser: Bin.urlParser});
  }

  request(url, options) {
    /*
      Assumes the @url ends with a primary key a la: app/person/123

      @options
      - method
      - data
    */
    switch (options.method) {
      case 'GET': return this.get(url);
      case 'POST': return this.post(url, options.data);
      case 'PUT': return this.put(url, options.data);
      case 'DELETE': return this.delete(url);
    }
  }

  get(url) {
    return new Promise((resolve, reject) => {
      // We want to check if the URL is like /person/ or /person/1
      let getMany = /\/$/.test(url);
      let resource = getMany ? this.bin.all(url) : this.bin.get(url);
      if (resource === undefined)
        reject('Error: No resource found at: ' + url);
      else
        resolve(resource);
    });
  }

  post(url, data) {
    return new Promise((resolve) => {
      let resource = Object.assign({}, data, {id: uuid()});
      this.bin.set(url, resource.id, resource);
      resolve(resource);
    });
  }

  put(url, data) {
    return new Promise((resolve, reject) => {
      let resource = this.bin.get(url);
      if (resource === undefined)
        reject('Error: Resource not found at: ' + url);
      else {
        let updated = Object.assign({}, resource, data);
        this.bin.set(url, updated);
        resolve(updated);
      }
    });
  }

  delete(url) {
    return new Promise((resolve, reject) => {
      let resource = this.bin.get(url);
      if (resource === undefined)
        reject('Error: Resource not found at: ' + url);
      else {
        this.bin.erase(url);
        resolve();
      }
    });
  }

}

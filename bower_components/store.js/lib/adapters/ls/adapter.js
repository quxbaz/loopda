/*
  Localstorage adapter
*/

import Server from './server';

export default class LSAdapter {

  constructor() {
    this.server = new Server();
  }

  create(record) {
    let {url} = record.props.model;
    return this.server.request(url, {
      method: 'POST',
      data: record.toJSON()
    });
  }

  read(model, id) {
    let url = model.url + (id ? id : '');
    return this.server.request(url, {method: 'GET'});
  }

  update(record) {
    let url = record.props.model.url + record.state.id;
    return this.server.request(url, {
      method: 'PUT',
      data: record.toJSON()
    });
  }

  delete(record) {
    let url = record.props.model.url + record.state.id;
    return this.server.request(url, {method: 'DELETE'});
  }

}

/*
  wire.js

  Fetches necessary data and starts up components.
*/

export default class Wire {

  constructor(props={}) {
    this.props = props;
  }

  start() {
    this.fetch().then(this.ready.bind(this));
    return this;
  }

  fetch() {
    return Promise.resolve();
  }

  ready() {}

}

export default class Dispatcher {

  constructor() {
    this.callbacks = [];
  }

  register(fn) {
    this.callbacks.push(fn);
    return this;
  }

  dispatch(...args) {
    for (let fn of this.callbacks)
      fn(...args);
    return this;
  }

}

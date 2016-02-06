import Sentry from 'sentry';

export default class Dispatcher {

  constructor() {
    this.sentry = new Sentry();
  }

  on(action, handler) {
    this.sentry.on(action, handler);
    return this;
  }

  emit(action, ...args) {
    this.sentry.trigger(action, ...args);
    return this;
  }

}

/*
  Simple event emitter

  <Usage>

  let sentry = new Sentry({
    'click': () => console.log('click'),
    'hover': () => console.log('hover')
  });

  sentry.on('click', () => {
    console.log('another click');
  });

  sentry.trigger('click');  // click, another click

  sentry.off('hover');
  sentry.trigger('hover');  // no output

*/

export default class Sentry {

  constructor(eventMap={}) {
    this.events = {};
    this.on(eventMap);
  }

  _bindMap(eventMap) {
    for (let event of Object.keys(eventMap))
      this.on(event, eventMap[event]);
  }

  hasEvent(event) {
    return this.events[event] !== undefined && this.events[event].length > 0;
  }

  on(event, handler) {
    if (typeof event === 'object') {
      this._bindMap(event);
      return this;
    }
    if (this.events[event] === undefined)
      this.events[event] = [];
    this.events[event].push(handler);
    return this;
  }

  trigger(event, ...args) {
    if (this.events[event] === undefined)
      return;
    for (let handler of this.events[event])
      handler(...args);
    return this;
  }

  triggerWith(context, event, ...args) {
    /*
      <Warning> Binding a function with an arrow function will
      override whatever context you pass in here. Example:

        sentry.on('click', () => {});
        sentry.triggerWith(context, 'click');  // context will be ignored

      Tricky, tricky,...
    */
    if (this.events[event] === undefined)
      return;
    for (let handler of this.events[event])
      handler.apply(context, args);
    return this;
  }

  off(event, handler) {
    if (handler === undefined)
      this.events[event] = [];
    else {
      this.events[event] = this.events[event].filter(
        fn => fn !== handler
      );
    }
    return this;
  }

}

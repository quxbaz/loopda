/*
  stateful.js

  Mixin for stateful objects.

  <TODO>
  This needs to trigger a state change event whenever the state
  changes.
*/

let uniqId = (() => {
  let i = 0;
  return () => i++;
})();

export let mixin = {

  setState(state) {

    /*
      <WARNING> We are making a very bad, dirty assumption here that
      setState will be called in the constructor.
    */
    if (!this.id)
      this.id = uniqId();

    if (this.state === undefined) {
      this._state = {};
      Object.defineProperty(this, 'state', {
        get: () => this._state,
        set() {
          throw Error("You cannot reassign @state. Use setState instead.");
        }
      });
    }
    let newState = Object.assign({}, this.state, state);
    if (this.validateState)
      Object.assign(this.state, this.validateState(newState));
    else
      Object.assign(this.state, state);
    if (this._stateChangeHandlers !== undefined) {
      this._stateChangeHandlers.forEach((handler) => {
        handler(this.state);
      });
    }
  },

  onStateChange(handler) {
    if (this._stateChangeHandlers === undefined)
      this._stateChangeHandlers = [];
    this._stateChangeHandlers.push(handler);
  },

  offStateChange(handler) {
    let i = this._stateChangeHandlers.indexOf(handler);
    if (i == -1)
      throw new Error("Handler is not attached.");
    else
      this._stateChangeHandlers.splice(i, 1);
  }

};

export default {
  mixin
};

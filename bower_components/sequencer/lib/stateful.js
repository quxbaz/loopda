/*
  stateful.js

  Mixin for stateful objects.

  <TODO>
  This needs to trigger a state change event whenever the state
  changes.
*/

export let mixin = {

  setState(state) {
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
  }

};

export default {
  mixin
};

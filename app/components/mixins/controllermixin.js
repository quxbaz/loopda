/*
  Mixin for interoperating with controllers.
*/

export default {

  model() {
    return this.props.ctrl.props.model;
  },

  trigger(...args) {
    return this.props.ctrl.trigger(...args);
  }

};

/*
  Mixin for updating a component from a model by way of forceUpdate()
*/

export default {

  componentDidMount() {
    this._modelUpdate = () => this.forceUpdate();
    this.model().onStateChange(this._modelUpdate);
  },

  componentWillUnmount() {
    this.model().offStateChange(this._modelUpdate);
  }

};

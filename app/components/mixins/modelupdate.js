/*
  Mixin for updating a component from a model by way of forceUpdate()
*/

export default {

  componentDidMount() {
    this._modelUpdate = () => this.forceUpdate();
    this.props.model.onStateChange(this._modelUpdate);
  },

  componentWillUnmount() {
    this.props.model.offStateChange(this._modelUpdate);
  }

};

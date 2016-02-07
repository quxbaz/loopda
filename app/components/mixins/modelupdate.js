/*
  Mixin for updating a component from a model by way of forceUpdate()
*/

export default {

  componentDidMount() {
    this._modelUpdate = () => this.forceUpdate();
    this.props.model.on('change', this._modelUpdate);
  },

  componentWillUnmount() {
    this.props.model.off('change', this._modelUpdate);
  }

};

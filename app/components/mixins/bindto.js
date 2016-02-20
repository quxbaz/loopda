/*
  Updates a component binded to a model.

  <Usage>
  <Component bindTo={modelA} />            // Binding to a single model
  <Component bindTo={[modelB, modelC]} />  // Binding to multiple models
*/

export default {

  _update() {
    this.forceUpdate();
  },

  componentDidMount() {
    let bindTo = [].concat(this.props.bindTo);  // Coerce to array
    for (let obj of bindTo)
      obj.on('change', this._update);
  },

  componentWillUnmount() {
    let bindTo = [].concat(this.props.bindTo);
    for (let obj of bindTo)
      obj.off('change', this._update);
  }

};

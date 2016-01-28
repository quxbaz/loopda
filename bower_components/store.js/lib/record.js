import {cid, without, hasId} from './util';

export default class Record {

  constructor(state={}, props) {
    this.cid = cid();
    this.state = state;
    this.props = props;
  }

  setState(state) {
    Object.assign(this.state, state);
  }

  save(state) {
    if (state !== undefined)
      this.setState(state);
    return this.props.store.saveRecord(this).then((data) => {
      this.setState(data);
      return data;
    });
  }

  toJSON() {
    /*
      Akin to Backbone.Model.toJSON()
      This returns @state stripped of non-persisted records.
    */
    let {schema} = this.props.model;
    let {store} = this.props;

    let belongsTos = Object.keys(schema)
      .filter(attr => schema[attr].type === 'belongsTo')
      .map(attr => store.searchCache(attr, this.state[attr]));

    let toStrip = [];
    let data = Object.assign({}, this.state);

    belongsTos.forEach((record) => {
      let modelName = record.props.model.name;
      // If the record is not persisted, do not save the relation to it.
      if (!record.state.id)
        toStrip.push(modelName);
      // If the record is persisted and is referenced by cid change
      // the value to its id.
      else if (this.state[modelName] !== record.state.id)
        data[modelName] = record.state.id;
    });

    return without(data, toStrip);
  }

  destroy() {
    return this.props.store.destroyRecord(this);
  }

  get(attr) {
    /*
      For getting [hasMany, belongsTo] records. Always returns a
      promise.

      <TODO>
      If schema attr does not exist, throw an error.
    */
    let {schema, name} = this.props.model;
    let relation = schema[attr];
    if (relation.type === 'belongsTo') {
      let belongsToId = this.state[relation.modelName];
      return this.props.store.get(relation.modelName, belongsToId);
    }
    else if (relation.type === 'hasMany') {
      return this.props.store.all(relation.modelName).then(
        records => records.filter(
          record => hasId(this, record.state[name])
        )
      );
    }
  }

  detach(attr) {
    /*
      Detaches a belongsTo record.
    */
    this.state[attr] = undefined;
  }

}

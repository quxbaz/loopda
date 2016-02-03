export class Relation {
  constructor(type, modelName) {
    this.type = type;  // ['hasMany', 'belongsTo']
    this.modelName = modelName;
  }
}

export let attr = () => {
  return new Relation('attr');
};

export let hasMany = (modelName) => {
  return new Relation('hasMany', modelName);
};

export let belongsTo = (modelName) => {
  return new Relation('belongsTo', modelName);
};

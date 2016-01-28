store.js

<Usage>

store.registerModel('zoo', '/zoo/', {
  cats: relations.hasMany('cat')
});

store.registerModel('cat', '/cat/');

let zoo = store.createRecord('zoo', {city: 'chicago'});

zoo.save().then((data) => {

  // zoo.state.id now exists
  let id = zoo.state.id;

  return store.get('zoo', id);

}).then((record) => {

  zoo === record // => true

}).then(() => {

  let mittens = store.createRecord('cat', {
    name: 'mittens'
    zoo: zoo.state.id
  });

  return mittens.save();

}).then(

  () => zoo.get('cats')

).then(

  (cats) => {
    cats.length === 1
    cats[0] === mittens
  }

);
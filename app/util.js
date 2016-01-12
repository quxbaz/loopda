export let uniqId = (() => {
  let _id = 0;
  return () => _id++;
})();

export function requireProps(object, props) {
  _.each(props, function(prop) {
    if (!_.has(object, prop))
      throw new Error('Property @' + prop + ' is required.');
  });
}

export function constrain(val, minmax) {
  return Math.min(Math.max(val, minmax[0]), minmax[1]);
}

export let uniqId = (() => {
  let _id = 0;
  return () => _id++;
})();

export let last = (arr) => arr[arr.length - 1];

export function each(obj, fn) {
  Object.keys(obj).forEach((key) => {
    fn(obj[key], key);
  });
}

export function times(n, fn) {
  let results = [];
  for (let i=0; i < n; i++)
    results.push(fn());
  return results;
}

export function requireProps(obj, props) {
  props.forEach(function(prop) {
    if (!obj.hasOwnProperty(prop))
      throw new Error('Property @' + prop + ' is required.');
  });
}

export let constrain = (val, [min, max]) =>
  Math.min(Math.max(val, min), max);

export function fireOnce(el, event, handler) {
  /*
    Fires a handler in response to an event, then detaches it.
  */
  el.addEventListener(event, function once() {
    handler.apply(null, arguments);
    el.removeEventListener(event, once);
  });
}

export function titleCase(s, sep=' ') {
  return s.split(sep).map(word =>
    word[0].toUpperCase() + word.slice(1)
  ).join(sep);
}

export function ifn(cond, then, else_) {
  /*
    if-statement as an expression.
  */
  if (cond)
    return then;
  else
    return else_;
}

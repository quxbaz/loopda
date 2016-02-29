export let uniqId = (() => {
  let _id = 0;
  return () => _id++;
})();

export let last = (arr) => arr[arr.length - 1];

export let initial = (arr) => arr.slice(0, -1);

export function each(o, fn) {
  if (o === undefined || o === null)
    return;
  let keys = Object.keys(o);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    if (fn(o[key], key) === false)
      return;
  }
}

export function times(n, fn) {
  let results = [];
  for (let i=0; i < n; i++)
    results.push(fn(i));
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

export let capitalize = (s) => s.substring(0, 1).toUpperCase() + s.substring(1);

export function titleCase(s, sep=' ') {
  return s.split(sep).map(word =>
    word[0].toUpperCase() + word.slice(1)
  ).join(sep);
}

// if-statement as an expression.
export let ifn = (cond, then, else_) => cond ? then : else_;

export function without(obj, keys) {
  /*
    Returns a new object with [keys] removed.
  */
  if (!Array.isArray(keys))
    keys = [keys];
  let newObj = Object.assign({}, obj);
  keys.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
}

export function copy(obj) {
  /*
    Returns a shallow copy of an object.
  */
  return Object.assign({}, obj);
}

export function keys(obj) {
  /*
    Returns the keys of an object.
  */
  return Object.keys(obj);
}

export function values(obj) {
  /*
    Returns the values of an object.
  */
  return Object.keys(obj).map(key => obj[key]);
}

export function filterMap(list, fn) {
  let data = [];
  list.forEach((val) => {
    let result = fn(val);
    if (result)
      data.push(result);
  });
  return data;
}

export function toggleState(model, boolProp) {
  model.setState({[boolProp]: !model.state[boolProp]});
}

export function throttle(fn, ms) {
  let lastCalled = 0;
  return function() {
    let time = performance.now();
    if (time - lastCalled > ms) {
      fn.apply(null, arguments);
      lastCalled = time;
    }
  };
}

export function randomChannelHSL() {
  /*
    Generates a random color (within a limited palette) for a channel.
  */
  let hue = Math.random() * 160 + 200;
  return `hsl(${hue}, 100%, 70%)`;
}

export let time = () => (new Date()).getTime();

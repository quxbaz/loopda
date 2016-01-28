// http://stackoverflow.com/a/8809472/376590
export function uuid() {
  let d = Date.now();
  if (window.performance && typeof window.performance.now === "function")
    d += performance.now();  // Use high-precision timer if available
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
  });
}

export function each(o, fn) {
  let keys = Object.keys(o);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    if (fn(o[key], key) === false)
      return;
  }
}

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

export let cid = (() => {
  let n = 0;
  return () => 'c' + (n++);
})();

export let hasId = (record, id) => {
  /*
    Searches by id and cid.
  */
  if (id === undefined)
    return false;
  return record.state.id === id || record.cid === id;
};

export let byId = (id) => {
  /*
    <Usage>
    records.find(byId(123));  // byId(123) returns a filter function.
  */
  return (record) => hasId(record, id);
};

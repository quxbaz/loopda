export let uniqId = (() => {
  let i = 0;
  return () => i++;
})();

export let assign = (...args) => Object.assign(...args);

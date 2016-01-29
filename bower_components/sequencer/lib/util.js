export let uniqId = (() => {
  let i = 0;
  return () => i++;
})();

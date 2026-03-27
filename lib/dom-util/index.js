const fireOnce = (el, event, handler) => {
  /*
    Fires an handler once, then detaches it. Returns the wrapper
    function so that it can be removed using removeEventListener
  */
  function once() {
    handler.apply(null, arguments)
    el.removeEventListener(event, once)
  }
  el.addEventListener(event, once)
  return once
}

export {fireOnce}

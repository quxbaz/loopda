export default function throttle(fn, delay) {
  let lastCall = 0
  let timeoutId = null
  return function (...args) {
    const now = Date.now()
    const remaining = delay - (now - lastCall)
    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      lastCall = now
      fn.apply(this, args)
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now()
        timeoutId = null
        fn.apply(this, args)
      }, remaining)
    }
  }
}

/*
  This is webworker code that should be treated as if it were on
  another page/url. It cannot reference any external code/dependencies
  at all.
*/

const thread = (tickInterval) => {

  /*
    This worker posts only one kind of message (via postMessage), a
    data object consisting of various time properties.
  */

  let running = false
  let cancel = () => {}

  const tick = () => {
    const id = setTimeout(() => {
      if (!running)
        return
      postMessage('tick')
      tick()
    }, tickInterval)
    cancel = () => clearTimeout(id)
  }

  self.addEventListener('message', (event) => {
    switch (event.data.message) {
      case 'start':
        running = true
        tick()
        break
      case 'stop':
        running = false
        cancel()
        break
      case 'restart':
        cancel()
        running = true
        tick()
        break
      case 'setTickInterval':
        tickInterval = event.data.tickInterval
        break
    }
  })

}

const threadStr = thread.toString()

export {threadStr}
export default thread

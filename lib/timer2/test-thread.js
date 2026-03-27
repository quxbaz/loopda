/*
  This is mostly the same code as thread.js except the tick function
  uses an incremental loop instead of a timer. For testing purposes
  only.
*/

const thread = (tickInterval) => {

  /*
    This worker posts only one kind of message (via postMessage), a
    data object consisting of various time properties.
  */

  let running = false
  let cancel = () => {}
  let counter = 0

  const tick = () => {
    for (let i=0; i < tickInterval; i++) {
      if (i === tickInterval - 1) {
        if (!running)
          return
        counter++
        if (counter > 100) {
          console.warn('Large loop (> 100 ticks) detected in thread.')
          return
        }
        postMessage('tick')
        tick()
      }
    }
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
      case 'setTickInterval':
        tickInterval = event.data.tickInterval
        break
    }
  })

}

const threadStr = thread.toString()

export {threadStr}
export default thread

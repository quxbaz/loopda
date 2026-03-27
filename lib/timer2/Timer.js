import Sentry from 'sentry'
import each from 'qux/lib/each'
import {has, now} from './util'
import {threadStr} from './thread'

const initialState = Object.freeze({
  running: false,
  tickInterval: 10,  // milliseconds
  tickCount: 0,
  threadStr,
})

class Timer extends Sentry {

  constructor(state={}) {
    super()
    Object.assign(this, initialState, state)
    this.worker = this.createWorker()
  }

  isRunning() {
    return this.running
  }

  createWorker() {
    const blobUrl = URL.createObjectURL(new Blob(
      [
        `(${this.threadStr})(${this.tickInterval})`
      ],
      {
        type: 'application/javascript'
      }
    ))
    const worker = new Worker(blobUrl)
    URL.revokeObjectURL(blobUrl)
    worker.addEventListener('message', (event) => this.update(event))
    return worker
  }

  update(event) {
    if (!this.running || event.data !== 'tick')
      return
    this.tickCount++
    this.trigger('tick', this)
  }

  start() {
    if (this.running)
      return
    this.running = true
    this.worker.postMessage({message: 'start'})
  }

  stop() {
    if (!this.running)
      return
    this.running = false
    this.worker.postMessage({message: 'stop'})
  }

  restart() {
    this.running = true
    this.worker.postMessage({message: 'restart'})
  }

  setTickInterval(ms) {
    this.tickInterval = ms
    this.worker.postMessage({
      message: 'setTickInterval',
      tickInterval: ms,
    })
  }

}

export default Timer

import ReactPerf from 'react/lib/ReactDefaultPerf'

const time = (fn) => {
  console.time('test/time')
  fn()
  console.timeEnd('test/time')
}

const reactProfile = (fn, print=true) => {
  ReactPerf.start(); fn(); ReactPerf.stop()
  ReactPerf.printWasted(
    ReactPerf.getLastMeasurements()
  )
}

export {time, reactProfile}

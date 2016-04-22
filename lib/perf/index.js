import ReactPerf from 'react/lib/ReactDefaultPerf'

export const time = (fn) => {
  console.time('test/time')
  fn()
  console.timeEnd('test/time')
}

export const reactProfile = (fn) => {
  ReactPerf.start(); fn(); ReactPerf.stop()
  ReactPerf.printWasted(
    ReactPerf.getLastMeasurements()
  )
}

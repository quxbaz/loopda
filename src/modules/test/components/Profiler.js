import React from 'react'
import ReactPerf from 'react/lib/ReactDefaultPerf'

class Profiler extends React.Component {

  constructor(props) {
    super(props)
    this.state = {started: false}
    this.startProfiling = this.startProfiling.bind(this)
    this.stopProfiling = this.stopProfiling.bind(this)
  }

  startProfiling() {
    this.setState({running: true})
    ReactPerf.start()
  }

  stopProfiling() {
    ReactPerf.stop()
    ReactPerf.printWasted()
    this.setState({running: false})
  }

  render() {
    return (
      <div>
        {this.state.running ?
          <button style={{color: 'white', background: 'black'}} onClick={this.stopProfiling}>Stop profiling</button> :
          <button onClick={this.startProfiling}>Start profiling</button>}
      </div>
    )
  }

}

// const Profiler = () => (
//   <div>
//     Profile:{' '}
//     <button onClick={startProfiling}>Start</button>{' '}
//     <button onClick={stopProfiling}>Stop</button>
//   </div>
// )

export default Profiler

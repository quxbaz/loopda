import React, {Component} from 'react'
import ReactPerf from 'react/lib/ReactDefaultPerf'
import ux from '../../ux'

class Profiler extends Component {

  constructor(props) {
    super(props)
    this.state = {started: false}
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  start() {
    this.setState({running: true})
    ReactPerf.start()
  }

  stop() {
    ReactPerf.stop()
    // ReactPerf.printInclusive()
    // ReactPerf.printExclusive()
    ReactPerf.printWasted()
    // ReactPerf.printOperations()
    this.setState({running: false})
  }

  toggle() {
    if (this.state.running)
      this.stop()
    else
      this.start()
  }

  render() {
    return (
      <div>
        <ux.KeyWatcher keyCode={82 /* r */} handler={this.toggle} />
        {this.state.running ?
          <button style={{color: 'white', background: 'black'}} onClick={this.stop}>Stop profiling</button> :
          <button onClick={this.start}>Start profiling</button>}
      </div>
    )
  }

}

export default Profiler

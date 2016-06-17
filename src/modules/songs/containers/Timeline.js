import React from 'react'
import {PureComponent} from 'loopda/lib/react-ext'

class Timeline extends PureComponent {
  renderTicks() {
    const ticks = []
    for (let i=0; i < 16; i++) {
      ticks.push(<div key={i} className="timeline-tick" />)
    }
    return ticks
  }
  render() {
    return (
      <div className="timeline">
        {this.renderTicks()}
      </div>
    )
  }
}

export default Timeline

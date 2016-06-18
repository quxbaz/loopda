import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {songPlayer} from 'trax'
import {PureComponent} from 'loopda/lib/react-ext'
import traxExt from '../../trax-ext'

class Timeline extends PureComponent {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleClick(event) {
    const beat = traxExt.util.getTickClicked(event, this.refs.ticks)
    this.props.onClick(this.props.i * 16 + beat)
  }

  handleMouseMove(event) {
    const beat = traxExt.util.getTickClicked(event, this.refs.ticks)
    this.props.onMouseMove(beat)
  }

  renderTicks() {
    const ticks = []
    for (let i=0; i < 16; i++) {
      ticks.push(<div key={i} className="timeline-tick" />)
    }
    return ticks
  }

  render() {
    const {i} = this.props
    return (
      <div className="timeline" onMouseMove={this.handleMouseMove} onMouseOut={this.props.onMouseOut} >
        <div ref="ticks" className="timeline-ticks" onClick={this.handleClick}>
          {this.renderTicks()}
        </div>
        <div className="timeline-n-label">{i + 1}</div>
      </div>
    )
  }
}

Timeline.propTypes = {
  i: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  onClick(i) {
    dispatch(songPlayer.actions.setCurrentBeat(i))
  },
})

export default connect(null, mapDispatchToProps)(Timeline)

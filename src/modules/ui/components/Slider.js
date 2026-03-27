import React, {Component} from 'react'
import PropTypes from 'prop-types'
import constrain from 'qux/lib/constrain'
import {fireOnce} from 'dom-util'

let genBarCSS = (length) => {
  return {
    width: length + 'px',
    height: '32px',
    background: 'yellow',
    border: '1px solid red'
  }
}

let genGrabberCSS = (width, offset) => {
  return {
    width: width + 'px',
    height: '32px',
    background: 'orange',
    marginLeft: offset + 'px'
  }
}

class Slider extends Component {

  constructor(props) {
    super(props)
    this.sliderRef = React.createRef()
    this.handleBarClick = this.handleBarClick.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp)
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleBarClick(event) {
    this.onMouseUp = fireOnce(window, 'mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    this.onNewOffset(event.clientX)
  }

  handleMouseUp() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove(event) {
    this.onNewOffset(event.clientX)
  }

  onNewOffset(mouseX) {
    let {name, barWidth, grabberWidth} = this.props
    let barX = this.sliderRef.current.getBoundingClientRect().left
    let offset = constrain(
      (mouseX - barX) - (grabberWidth / 2),
      [0, (barWidth - grabberWidth)]
    )
    this.props.onChange(name, this.getValue(offset), this.getScale(offset))
  }

  getPixelOffset(value) {
    let {barWidth, grabberWidth} = this.props
    let {min, max} = this.props
    return (barWidth - grabberWidth) * (value - min) / (max - min)
  }

  getScale(offset) {
    let {barWidth, grabberWidth} = this.props
    return offset / (barWidth - grabberWidth)
  }

  getValue(offset) {
    let {max, min} = this.props
    return (max - min) * this.getScale(offset) + min
  }

  render() {
    let {name, barWidth, grabberWidth} = this.props
    let offset = this.getPixelOffset(this.props.value)
    let barCSS = genBarCSS(barWidth)
    let grabberCSS = genGrabberCSS(grabberWidth, offset)
    return (
      <div ref={this.sliderRef} className="ui-slider">
        {name}
        <div className="ui-slider-bar" onMouseDown={this.handleBarClick} style={barCSS}>
          <div className="ui-slider-grabber clicky" style={grabberCSS} />
        </div>
        <span>
          {this.getValue(offset)}, {this.getScale(offset) * 100}%
        </span>
      </div>
    )
  }

}

Slider.defaultProps = {
  barWidth: 200,
  grabberWidth: 40,
  value: 50,
  min: 0,
  max: 100,
  onChange: () => {},
  onSet: () => {},
}

Slider.propTypes = {
  barWidth: PropTypes.number,
  grabberWidth: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSet: PropTypes.func.isRequired,
}

export default Slider

import React from 'react'
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

const Slider = React.createClass({

  propTypes: {

    // Styles
    barWidth: React.PropTypes.number,
    grabberWidth: React.PropTypes.number,

    name: React.PropTypes.string.isRequired,

    // Values
    value: React.PropTypes.number.isRequired,
    min: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,

    // Callbacks
    onChange: React.PropTypes.func.isRequired,
    onSet: React.PropTypes.func.isRequired

  },

  getDefaultProps() {
    return {
      barWidth: 200,
      grabberWidth: 40,
      value: 50,
      min: 0,
      max: 100,
      onChange: () => {},
      onSet: () => {}
    }
  },

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.handleMouseMove)
  },

  handleBarClick(event) {
    this.onMouseUp = fireOnce(window, 'mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    this.onNewOffset(event.clientX)
  },

  handleMouseUp() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  },

  handleMouseMove(event) {
    this.onNewOffset(event.clientX)
  },

  onNewOffset(mouseX) {
    let {name, barWidth, grabberWidth} = this.props
    let barX = this.refs.slider.getBoundingClientRect().left
    let offset = constrain(
      (mouseX - barX) - (grabberWidth / 2),
      [0, (barWidth - grabberWidth)]
    )
    this.props.onChange(name, this.getValue(offset), this.getScale(offset))
  },

  getPixelOffset(value) {
    /*
      Gets a pixel offset given a bar value.
    */
    let {barWidth, grabberWidth} = this.props
    let {min, max} = this.props
    return (barWidth - grabberWidth) * (value - min) / (max - min)
  },

  getScale(offset) {
    /*
      Gets a value from [0 - 1] given a pixel offset.
    */
    let {barWidth, grabberWidth} = this.props
    return offset / (barWidth - grabberWidth)
  },

  getValue(offset) {
    /*
      Gets a value from [props.min - props.max] given a pixel offset.
    */
    let {max, min} = this.props
    return (max - min) * this.getScale(offset) + min
  },

  render() {
    let {name, barWidth, grabberWidth} = this.props
    let offset = this.getPixelOffset(this.props.value)
    let barCSS = genBarCSS(barWidth)
    let grabberCSS = genGrabberCSS(grabberWidth, offset)
    return (
      <div ref="slider" className="ui-slider">
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

})

export default Slider

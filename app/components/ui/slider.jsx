import React from 'react';
import ReactDOM from 'react-dom';
import {fireOnce, constrain} from 'lib/util';

let genBarCSS = (length) => {
  return {
    width: length + 'px',
    height: '32px',
    background: 'yellow',
    border: '1px solid red'
  };
};

let genGrabberCSS = (width, offset) => {
  return {
    width: width + 'px',
    height: '32px',
    background: 'orange',
    marginLeft: offset + 'px'
  };
};

export default React.createClass({

  propTypes: {

    // Styles
    barWidth: React.PropTypes.number,
    grabberWidth: React.PropTypes.number,

    // Values
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    value: React.PropTypes.number,

    // Callbacks
    onChange: React.PropTypes.func

  },

  getDefaultProps() {
    return {
      barWidth: 200, grabberWidth: 40,
      min: 0, max: 100, value: 50,
      onChange: () => {}
    };
  },

  handleBarClick(event) {
    fireOnce(window, 'mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    this.onNewOffset(event.clientX);
  },

  handleMouseUp() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  },

  handleMouseMove(event) {
    this.onNewOffset(event.clientX);
  },

  onNewOffset(mouseX) {
    let {barWidth, grabberWidth} = this.props;
    let barX = ReactDOM.findDOMNode(this).getBoundingClientRect().left;
    let offset = constrain(
      (mouseX - barX) - (grabberWidth / 2),
      [0, (barWidth - grabberWidth)]
    );
    this.props.onChange(this.getValue(offset), this.getScale(offset));
  },

  getPixelOffset(value) {
    /*
      Gets a pixel offset given a bar value.
    */
    let {barWidth, grabberWidth} = this.props;
    let {min, max} = this.props;
    return (barWidth - grabberWidth) * (value - min) / (max - min);
  },

  getScale(offset) {
    /*
      Gets a value from [0 - 1] given a pixel offset.
    */
    let {barWidth, grabberWidth} = this.props;
    return offset / (barWidth - grabberWidth);
  },

  getValue(offset) {
    /*
      Gets a value from [props.min - props.max] given a pixel offset.
    */
    let {max, min} = this.props;
    return (max - min) * this.getScale(offset) + min;
  },

  render() {
    let {barWidth, grabberWidth} = this.props;
    let offset = this.getPixelOffset(this.props.value);
    let barCSS = genBarCSS(barWidth);
    let grabberCSS = genGrabberCSS(grabberWidth, offset);
    return (
      <div className="ui-slider">
        <div className="ui-slider-bar" onMouseDown={this.handleBarClick} style={barCSS}>
          <div className="ui-slider-grabber" style={grabberCSS} />
        </div>
        <span>
          {this.getValue(offset)}, {this.getScale(offset) * 100}%
        </span>
      </div>
    );
  }

});

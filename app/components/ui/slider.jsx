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
    onChange: React.PropTypes.func,
    onSet: React.PropTypes.func

  },

  getDefaultProps() {
    return {
      barWidth: 200,
      grabberWidth: 40,
      min: 0,
      max: 100,
      value: 50,
      onChange: () => {},
      onSet: () => {}
    };
  },

  getInitialState() {
    return {
      grabberOffset: this.getOffset(this.props.value)
    };
  },

  handleBarClick(event) {
    fireOnce(window, 'mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    this.centerGrabberOnMouse(event.clientX);
  },

  handleMouseUp() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    this.props.onSet(this.getValue(), this.getScale());
  },

  handleMouseMove(event) {
    this.centerGrabberOnMouse(event.clientX);
  },

  centerGrabberOnMouse(mouseX) {
    let {barWidth, grabberWidth} = this.props;
    let barX = ReactDOM.findDOMNode(this).getBoundingClientRect().left;
    let grabberOffset = constrain(
      (mouseX - barX) - (grabberWidth / 2),
      [0, (barWidth - grabberWidth)]
    );
    this.setState({grabberOffset});
    this.props.onChange(this.getValue(), this.getScale());
  },

  getOffset(value) {
    let {barWidth, grabberWidth} = this.props;
    let {min, max} = this.props;
    return (barWidth - grabberWidth) * (value - min) / (max - min);
  },

  getScale() {
    let {barWidth, grabberWidth} = this.props;
    return this.state.grabberOffset / (barWidth - grabberWidth);
  },

  getValue() {
    let {max, min} = this.props;
    return (max - min) * this.getScale() + min;
  },

  render() {
    let barCSS = genBarCSS(this.props.barWidth);
    let grabberCSS = genGrabberCSS(this.props.grabberWidth, this.state.grabberOffset);
    return (
      <div className="ui-slider">
        <div className="ui-slider-bar" onMouseDown={this.handleBarClick} style={barCSS}>
          <div className="ui-slider-grabber" style={grabberCSS} />
        </div>
        <span>
          {this.getValue()}, {this.getScale() * 100}%
        </span>
      </div>
    );
  }

});

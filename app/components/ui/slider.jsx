import React from 'react';
import ReactDOM from 'react-dom';

let px = val => val + 'px';

let slider = {
  width: 300,
  height: 24,
};

let grabber = {
  width: 76,
  height: 32
};

let sliderStyle = {
  zIndex       : 4000,
  position     : 'absolute',
  top          : '50%',
  left         : '50%',
  marginLeft   : px(-slider.width / 2),
  marginTop    : px(-slider.height / 2),
  width        : px(slider.width),
  height       : px(slider.height),
  borderRadius : '32px',
  background   : 'blue'
};

let grabberStyle = {
  position     : 'absolute',
  width        : px(grabber.width),
  height       : px(grabber.height),
  top          : px((slider.height - grabber.height) / 2),
  left         : px(slider.width / 2 - grabber.width / 2),
  borderRadius : '32px',
  color        : 'white',
  background   : 'red'
};

let bound = (x, [min, max]) => Math.max(Math.min(x, max), min);

export default React.createClass({

  getInitialState() {
    return {
      lastValue: 50,
      value: 50,
      min: 0,
      max: 100,
      float: false,
      grabberX: (slider.width / 2) - (grabber.width / 2)
    };
  },

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
    window.addEventListener('mousemove', this.adjustValue);
  },

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.adjustValue);
    this.setState({lastValue: this.state.value});
  },

  adjustValue(event) {
    let pageLeft = this.el.getBoundingClientRect().left;
    let grabberX = event.clientX - pageLeft - (grabber.width / 2);
    grabberX = bound(grabberX, [0, slider.width - grabber.width]);
    let sliderLength = slider.width - grabber.width;
    let value = (this.state.max - this.state.min) * (grabberX / sliderLength) + this.state.min;
    if (!this.state.float)
      value = Math.round(value);
    this.setState({grabberX, value});
  },

  render() {
    // let finalGrabberStyle = Object.assign({}, grabberStyle, {
    //   // left: this.state.grabberX + 'px'
    //   // left: slider.width / 2 - grabber.width / 2 + 'px'
    // });
    return (
      <div className="ui-slider" style={sliderStyle}>
        <div className="ui-slider-grabber center-content" style={grabberStyle}>
          {this.state.lastValue} -> {this.state.value}
        </div>
      </div>
    );
  }

});

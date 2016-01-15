import React from 'react';
import ReactDOM from 'react-dom';

let px = val => val + 'px';

let scale = {
  length: 300,
  height: 24,
};

let grabber = {
  width: 76,
  height: 32
};

let scaleStyle = {
  zIndex       : 4000,
  position     : 'absolute',
  top          : '50%',
  left         : '50%',
  marginLeft   : px(-scale.length / 2),
  marginTop    : px(-scale.height / 2),
  width        : px(scale.length),
  height       : px(scale.height),
  borderRadius : '32px',
  background   : 'blue'
};

let grabberStyle = {
  position     : 'absolute',
  width        : px(grabber.width),
  height       : px(grabber.height),
  top          : px((scale.height - grabber.height) / 2),
  left         : px(scale.length / 2 - grabber.width / 2),
  borderRadius : '32px',
  color        : 'white',
  background   : 'red'
};

let bound = (x, [min, max]) => Math.max(Math.min(x, max), min);

export default React.createClass({

  getDefaultProps() {
    return {
      lastValue: 0,
      value: 0,
      min: 0,
      max: 1
    };
  },

  getInitialState() {
    return {
      lastValue: this.props.value,
      value: this.props.value
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
    let scaleOffset = event.clientX - this.el.getBoundingClientRect().left;
    scaleOffset = bound(scaleOffset, [0, scale.length]);
    let min = this.props.min;
    let max = this.props.max;
    let value = (max - min) * (scaleOffset / scale.length) + min;
    this.setState({value});
    this.props.onSetValue(value);
  },

  render() {
    let pretty = x => Math.round(x * 10) / 10;
    return (
      <div className="ui-scale" style={scaleStyle}>
        <div className="ui-scale-grabber center-content" style={grabberStyle}>
          {this.state.lastValue} -> {pretty(this.state.value)}
        </div>
      </div>
    );
  }

});

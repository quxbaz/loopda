import React from 'react';
import ReactDOM from 'react-dom';

let minScaleLength = 300;
let bound = (x, [min, max]) => Math.max(Math.min(x, max), min);

export default React.createClass({

  getDefaultProps() {
    return {
      value: 0,
      min: 0,
      max: 100,
      float: false
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
    window.addEventListener('mousemove', this.handleMouseMove);
  },

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({lastValue: this.state.value});
  },

  handleMouseMove(event) {
    let scaleLength = Math.max(this.el.offsetWidth, minScaleLength);
    let mouseOffset = bound(
      event.clientX - this.el.getBoundingClientRect().left,
      [0, scaleLength]
    );
    let {min, max} = this.props;
    let value = (max - min) * (mouseOffset / scaleLength) + min;
    if (!this.state.float)
      value = Math.round(value);
    this.setState({value});
    this.props.onChange(value);
  },

  pretty(val) {
    return Math.round(val * 10) / 10;
  },

  render() {
    return (
      <div className="ui-scale">
        <div className="ui-scale-grabber">
          {this.pretty(this.state.lastValue)} -> {this.pretty(this.state.value)}
        </div>
      </div>
    );
  }

});

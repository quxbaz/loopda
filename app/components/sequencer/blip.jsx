import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Scale from 'components/ui/scale';
import doubleClick from 'components/mixins/doubleclick';
import {fireOnce} from 'util';

export default React.createClass({

  mixins: [doubleClick],

  getInitialState() {
    return {};
  },

  componentWillMount() {
    this.props.blip.onStateChange(() => {
      this.forceUpdate();
    });
  },

  componentWillUnmount() {
    // <TODO> Detach event handlers
  },

  toggleMute() {
    let blip = this.props.blip;
    blip.setState({mute: !blip.state.mute});
  },

  handleWheel(event) {
    let blip = this.props.blip;
    event.preventDefault();
    if (blip.state.mute)
      return;
    var direction = event.deltaY > 0 ? 'down' : 'up';
    this.adjustRate(direction);
  },

  adjustRate(direction) {
    let blip = this.props.blip;
    let rate = blip.state.rate;
    if (direction == 'up')
      rate += 0.1;
    else if (direction == 'down')
      rate -= 0.1;
    blip.setState({rate});
  },

  handleDoubleClick(event) {
    this.setState({showScale: true});
    this.props.blip.setState({mute: false});
    fireOnce(window, 'mouseup', () => {
      this.setState({showScale: false});
    });
  },

  handleSetScale(value) {
    let blip = this.props.blip
    let {maxRate, minRate} = blip.state;
    let rate = (maxRate - minRate) * (value / 100) + minRate;
    blip.setState({rate});
  },

  render() {

    /*
      <TODO> Fix, this is rerendering too much.
      console.log('render');
    */

    let blip = this.props.blip;

    let props = {
      className: classNames({
        blip: true,
        mute: !blip.state.sampleName || blip.state.mute,
        playing: this.props.onBeat
      }),
      onClick: this.toggleMute,
      onWheel: this.handleWheel
    };

    let toRender = {};

    if (!blip.state.mute)
      toRender.rateLabel = <div className="rate-label">{this.state.rate}</div>;

    if (this.state.showScale) {
      let scaleProps = {
        value      : blip.state.rate,
        min        : blip.state.minRate,
        max        : blip.state.maxRate,
        onSetValue : this.handleSetScale
      };
      toRender.scale = <Scale {...scaleProps} />;
    }

    return (
      <div {...props}>
        {toRender.rateLabel}
        {toRender.scale}
      </div>
    );

  }

});

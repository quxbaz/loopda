import React from 'react';
import classNames from 'classnames';
import Slider from 'components/ui/slider';

export default React.createClass({

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

  showSlider(event) {

    let blip = this.props.blip;

    event.preventDefault();
    event.stopPropagation();

    if (!this.lastClick) {
      this.lastClick = new Date().getTime();
      return;
    }

    if (new Date().getTime() - this.lastClick < 500) {
      this.setState({showSlider: true});
      blip.setState({mute: false});
      let handler = (event) => {
        this.setState({showSlider: false});
        window.removeEventListener('mouseup', handler);
      };
      window.addEventListener('mouseup', handler);
    }

    this.lastClick = undefined;

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
      onWheel: this.handleWheel,
      onMouseDown: this.showSlider
    };

    let toRender = {};

    if (!blip.state.mute)
      toRender.rateLabel = <div className="rate-label">{this.state.rate}</div>;

    if (this.state.showSlider) {
      let sliderProps = {
        value: blip.state.rate,
        min: blip.state.minRate,
        max: blipstate.maxRate,
        onSetValue: this.handleSetScale
      };
      toRender.slider = <Slider {...sliderProps} />;
    }

    return (
      <div {...props}>
        {toRender.rateLabel}
        {toRender.slider}
      </div>
    );

  }

});

import React from 'react';
import classNames from 'classnames';
import Slider from 'components/ui/slider';

export default React.createClass({

  componentWillMount() {
    let blip = this.props.blip;
    this.setState(blip.state);
    blip.onStateChange((newState) => {
      this.setState(newState);
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
    event.preventDefault();
    if (this.state.mute)
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
    this.props.blip.setState({rate});
  },

  showSlider(event) {

    event.preventDefault();
    event.stopPropagation();

    if (!this.lastClick) {
      this.lastClick = new Date().getTime();
      return;
    }

    if (new Date().getTime() - this.lastClick < 500) {
      this.setState({showSlider: true});
      this.props.blip.setState({mute: false});
      let handler = (event) => {
        this.setState({showSlider: false});
        window.removeEventListener('mouseup', handler);
      };
      window.addEventListener('mouseup', handler);
    }

    this.lastClick = undefined;

  },

  handleSetScale(value) {
    let state = this.props.blip.state;
    let rate = (state.maxRate - state.minRate) * (value / 100) + (state.minRate);
    this.props.blip.setState({rate});
  },

  render() {

    /*
      <TODO> Fix, this is rerendering too much.
      console.log('render');
    */

    let props = {
      className: classNames({
        blip: true,
        mute: !this.state.sampleName || this.state.mute,
        playing: this.props.playing
      }),
      onClick: this.toggleMute,
      onWheel: this.handleWheel,
      onMouseDown: this.showSlider
    };

    let toRender = {};

    if (!this.state.mute)
      toRender.rateLabel = <div className="rate-label">{this.state.rate}</div>;

    if (this.state.showSlider) {
      let sliderProps = {
        value: this.state.rate,
        min: this.state.minRate,
        max: this.state.maxRate,
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

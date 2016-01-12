import React from 'react';
import classNames from 'classnames';

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

  toggle() {
    let blip = this.props.blip;
    blip.setState({
      mute: !blip.state.mute
    });
  },

  handleWheel(event) {
    event.preventDefault();
    if (this.state.mute)
      return;
    var direction = event.deltaY > 0 ? 'down' : 'up';
    this.adjustPitch(direction);
  },

  adjustPitch(direction) {
    let blip = this.props.blip;
    let rate = blip.state.rate;
    if (direction == 'up')
      rate += 0.1;
    else if (direction == 'down')
      rate -= 0.1;
    this.props.blip.setState({rate});
    this.setState({
      pitchLabel: Math.floor(blip.state.rateScale * 100)
    });
  },

  render() {

    /*
      <TODO> Fix, this is rerendering too much.
      console.log('render');
    */

    let props = {
      className: classNames({
        blip    : true,
        mute    : !this.state.sampleName || this.state.mute,
        playing : this.props.playing
      }),
      onMouseDown: this.toggle,
      onWheel: this.handleWheel
    };

    return (
      <div {...props}>
        {!this.state.mute && [
          <div className="pitch-scale" key={1}>{this.state.pitchScale}</div>,
          <div className="pitch-label" key={2}>{this.state.pitchLabel}</div>
        ]}
      </div>
    );

  }

});

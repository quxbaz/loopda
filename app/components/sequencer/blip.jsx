import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {constrain, fireOnce} from 'lib/util';
import doubleClick from 'components/mixins/doubleclick';
import Scale from 'components/ui/scale';
import BlipViewModel from 'app/sequencer/blip/viewmodel';

export default React.createClass({

  mixins: [doubleClick],

  getInitialState() {
    return {};
  },

  componentWillMount() {
    let blip = this.props.blip;
    this.vm = new BlipViewModel(blip);
    blip.onStateChange(() => {
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
    event.preventDefault();
    if (this.props.blip.state.mute)
      return;
    var direction = event.deltaY > 0 ? 'down' : 'up';
    this.tuneProp(direction);
  },

  tuneProp(direction) {
    let tuner = this.props.tuner;
    let blip = this.props.blip;
    let percent = this.vm.toPercent(tuner);
    if (direction == 'up')
      percent += 1;
    else if (direction == 'down')
      percent -= 1;
    blip.setState({
      [tuner]: this.vm.toValue(tuner, constrain(percent, [0, 100]))
    });
  },

  handleDoubleClick(event) {
    this.setState({scaleMode: true});
    this.props.blip.setState({mute: false});
    fireOnce(window, 'mouseup', () => {
      this.setState({scaleMode: false});
    });
  },

  handleScaleChange(percent) {
    let tuner = this.props.tuner;
    this.props.blip.setState({
      [tuner]: this.vm.toValue(tuner, percent)
    });
  },

  render() {

    let blip = this.props.blip;
    let tuner = this.props.tuner;

    let props = {
      className: classNames({
        blip: true,
        mute: !blip.state.sampleName || blip.state.mute,
        playing: this.props.isPlaying
      }),
      onClick: this.toggleMute,
      onWheel: this.handleWheel
    };

    let toRender = {};

    if (!blip.state.mute)
      toRender.tunerLabel = <div className="tuner-label">{this.vm.toPercent(tuner)}</div>;

    if (this.state.scaleMode) {
      let scaleProps = {
        value    : this.vm.toPercent(tuner),
        onChange : this.handleScaleChange
      };
      toRender.scale = <Scale {...scaleProps} />;
    }

    return (
      <div {...props}>
        {toRender.tunerLabel}
        {toRender.scale}
      </div>
    );

  }

});

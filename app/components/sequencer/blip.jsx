import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {fireOnce} from 'lib/util';
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

  // handleWheel(event) {
  //   event.preventDefault();
  //   let blip = this.props.blip;
  //   if (blip.state.mute)
  //     return;
  //   var direction = event.deltaY > 0 ? 'down' : 'up';
  //   this.adjustRate(direction);
  // },

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
    this.setState({scaleMode: true});
    this.props.blip.setState({mute: false});
    fireOnce(window, 'mouseup', () => {
      this.setState({scaleMode: false});
    });
  },

  handleScaleChange(percent) {
    this.props.blip.setState({
      rate: this.vm.toValue('rate', percent)
    });
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
      // onWheel: this.handleWheel
    };

    let toRender = {};

    if (!blip.state.mute)
      toRender.rateLabel = <div className="rate-label">{this.vm.toPercent('rate')}</div>;

    if (this.state.scaleMode) {
      let scaleProps = {
        value    : this.vm.toPercent('rate'),
        onChange : this.handleScaleChange
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

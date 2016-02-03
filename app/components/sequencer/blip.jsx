import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {constrain, fireOnce} from 'lib/util';
import modelUpdate from 'components/mixins/modelupdate';
import doubleClick from 'components/mixins/doubleclick';
import Scale from 'components/ui/scale';
import BlipViewModel from 'app/sequencer/blip/viewmodel';

export default React.createClass({

  mixins: [modelUpdate, doubleClick],

  getInitialState() {
    return {};
  },

  componentWillMount() {
    this.vm = new BlipViewModel(this.props.model);
  },

  toggleMute() {
    let {model} = this.props;
    model.setState({mute: !model.state.mute});
  },

  handleWheel(event) {
    event.preventDefault();
    if (this.props.model.state.mute)
      return;
    var direction = event.deltaY > 0 ? 'down' : 'up';
    this.tuneProp(direction);
  },

  tuneProp(direction) {
    let {model, tuner} = this.props;
    let percent = this.vm.toPercent(tuner);
    if (direction == 'up')
      percent += 1;
    else if (direction == 'down')
      percent -= 1;
    model.setState({
      [tuner]: this.vm.toValue(tuner, constrain(percent, [0, 100]))
    });
  },

  handleDoubleClick(event) {
    this.setState({scaleMode: true});
    this.props.model.setState({mute: false});
    fireOnce(window, 'mouseup', () => {
      this.setState({scaleMode: false});
    });
  },

  handleScaleChange(percent) {
    let {model, tuner} = this.props;
    model.setState({
      [tuner]: this.vm.toValue(tuner, percent)
    });
  },

  render() {

    let {model, tuner} = this.props;

    let props = {
      className: classNames({
        blip: true,
        mute: !model.state.sampleName || model.state.mute,
        playing: this.props.isPlaying
      }),
      onClick: this.toggleMute,
      onWheel: this.handleWheel
    };

    let toRender = {};

    if (!model.state.mute)
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

import React from 'react';
import classNames from 'classnames';
import {constrain, fireOnce} from 'lib/util';
import modelUpdate from 'components/mixins/modelupdate';
import doubleClick from 'components/mixins/doubleclick';
import Scale from 'components/ui/scale';
import helper from 'helpers/blip';
import dispatcher from 'app/dispatcher';
import blipActions from 'actions/sequencer/blip';

export default React.createClass({

  mixins: [modelUpdate, doubleClick],

  getInitialState() {
    return {};
  },

  toggleMute() {
    dispatcher.emit(blipActions.toggleMute, this.props.model);
  },

  handleWheel(event) {
    event.preventDefault();
    if (this.props.model.state.mute)
      return;
    var direction = event.deltaY > 0 ? 'down' : 'up';
    this.tuneProp(direction);
    this.props.model.play();
  },

  tuneProp(direction) {
    let {model, tuner} = this.props;
    let percent = helper.toPercent(model, tuner);
    if (direction == 'up')
      percent += 1;
    else if (direction == 'down')
      percent -= 1;
    model.setState({
      [tuner]: helper.toValue(model, tuner, constrain(percent, [0, 100]))
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
      [tuner]: helper.toValue(model, tuner, percent)
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
      toRender.tunerLabel = <div className="tuner-label">{helper.toPercent(model, tuner)}</div>;

    if (this.state.scaleMode) {
      let scaleProps = {
        value    : helper.toPercent(model, tuner),
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

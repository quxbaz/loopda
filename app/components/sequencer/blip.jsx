import React from 'react';
import classNames from 'classnames';
import bindTo from 'components/mixins/bindto';
import blipCtrl from 'controllers/sequencer/blip';

export default React.createClass({

  mixins: [bindTo],

  toggleMute() {
    blipCtrl.toggleMute(this.props.model);
  },

  render() {
    let {model} = this.props;
    let props = {
      className: classNames({
        blip: true,
        mute: !model.state.sampleName || model.state.mute,
        playing: this.props.isPlaying
      }),
      onMouseDown: this.toggleMute
    };
    return <div {...props} />;
  }

});

import React from 'react';
import classNames from 'classnames';
import bindTo from 'components/mixins/bindto';
import blipCtrl from 'controllers/sequencer/blip';

export default React.createClass({

  propTypes: {
    blip: React.PropTypes.object.isRequired
  },

  mixins: [bindTo],

  toggleMute() {
    blipCtrl.toggleMute(this.props.blip);
  },

  render() {
    let {blip} = this.props;
    let props = {
      className: classNames({
        blip: true,
        mute: !blip.state.sampleName || blip.state.mute,
        playing: this.props.isPlaying
      }),
      onMouseDown: this.toggleMute
      // onMouseDown: this.onMouseDown  // Can you specify this in the parent component?
    };
    return <div {...props} />;
  }

});

import React from 'react';
import classNames from 'classnames';

export default React.createClass({

  propTypes: {
    blip: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onClick() {}
    };
  },

  render() {
    let {blip} = this.props;
    let props = {
      className: classNames({
        blip: true,
        mute: !blip.state.sampleName || blip.state.mute,
        playing: this.props.isPlaying
      }),
      onMouseDown: this.props.onClick.bind(null, blip)
    };
    return <div {...props} />;
  }

});

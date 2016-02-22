import React from 'react';
import classNames from 'classnames';

export default function Blip(props) {
  let {blip} = props;
  let blipProps = {
    className: classNames({
      blip: true,
      mute: !blip.state.sampleName || blip.state.mute,
      playing: props.isPlaying
    }),
    onMouseDown: props.onClick.bind(null, blip)
  };
  return <div {...blipProps} />;
};

Blip.propTypes = {
  blip: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
};

Blip.defaultProps = {
  onClick() {}
};

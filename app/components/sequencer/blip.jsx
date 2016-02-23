import React from 'react';
import classNames from 'classnames';

Blip.propTypes = {
  blip: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
};

Blip.defaultProps = {
  onClick() {}
};

export default function Blip(props) {
  let {blip} = props;
  let {sampleName, mute} = blip.state;
  let blipProps = {
    className: classNames({
      blip: true,
      mute: mute || !sampleName,
      playing: props.isPlaying
    }),
    onMouseDown: props.onClick.bind(null, blip)
  };
  return <div {...blipProps} />;
};

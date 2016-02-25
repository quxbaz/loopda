import React from 'react';
import classNames from 'classnames';

Blip.propTypes = {
  blip: React.PropTypes.object.isRequired,
  color: React.PropTypes.string,
  onClick: React.PropTypes.func
};

Blip.defaultProps = {
  onClick() {}
};

export default function Blip(props) {
  let {mute} = props.blip.state;
  return React.DOM.div({
    className: classNames({
      blip: true,
      enabled: !mute
    }),
    onMouseDown: () => props.onClick(props.blip),
    style: mute ? {} : {background: props.color}
  });
};

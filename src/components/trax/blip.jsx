import React from 'react';
import classNames from 'classnames';

Blip.propTypes = {
  blip: React.PropTypes.object.isRequired,
  color: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default function Blip(props) {
  let {mute, onClick} = props.blip.state;
  return React.DOM.div({
    className: classNames({
      blip: true,
      enabled: !mute,
      clicky: props.onClick !== undefined
    }),
    onMouseDown: () => props.onClick !== undefined && props.onClick(props.blip),
    style: mute ? {} : {background: props.color}
  });
};

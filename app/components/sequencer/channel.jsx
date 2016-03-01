import React from 'react';
import classNames from 'classnames';
import BlipCom from './blip';

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  onClickBlip: React.PropTypes.func
};

export default function Channel(props) {

  let {blips, mute, color} = props.channel.state;

  let blipComs = blips.map((blip) =>
    React.createElement(BlipCom, {
      key: blip.id,
      blip,
      color,
      onClick: props.onClickBlip
    })
  );

  let classes = classNames({
    channel: true,
    enabled: !mute,
    mute: mute
  });

  return <div className={classes}>{blipComs}</div>;
};

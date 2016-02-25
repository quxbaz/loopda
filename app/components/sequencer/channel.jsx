import React from 'react';
import classNames from 'classnames';
import BlipCom from './blip';

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  onClickBlip: React.PropTypes.func
};

export default function Channel(props) {

  let {blips, mute} = props.channel.state;
  let {onClickBlip} = props;

  let blipComs = blips.map((blip) =>
    React.createElement(BlipCom, {
      key: blip.id,
      blip,

      color: `hsl(${Math.random() * 160 + 200}, 100%, 70%)`,

      onClick: onClickBlip,
    })
  );

  let classes = classNames({
    channel: true,
    enabled: !mute,
    mute: mute
  });

  return <div className={classes}>{blipComs}</div>;
};

import React from 'react';
import classNames from 'classnames';
import Blip from './blip';

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  soloMode: React.PropTypes.bool.isRequired,
  onClickBlip: React.PropTypes.func
};

export default function Channel(props) {

  let {blips, solo, mute, color} = props.channel.state;

  let blipComs = blips.map((blip) =>
    React.createElement(Blip, {
      key: blip.id,
      blip,
      color,
      onClick: props.onClickBlip
    })
  );

  let enabled = (props.soloMode && solo) || (!props.soloMode && !mute);

  let classes = classNames({
    channel: true,
    enabled,
    mute: !enabled
  });

  return <div className={classes}>{blipComs}</div>;
};

import React from 'react';
import classNames from 'classnames';
import Blip from './blip';

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  soloMode: React.PropTypes.bool.isRequired,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onClickBlip: React.PropTypes.func
};

Channel.defaultProps = {
  className: '',
  onClick: () => {}
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
  }) + ' ' + props.className;

  let handleClick = () => props.onClick(props.channel);

  return <div className={classes} onClick={handleClick}>{blipComs}</div>;
};

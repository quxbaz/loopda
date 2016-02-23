import React from 'react';
import classNames from 'classnames';
import BlipCom from './blip';

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  onClickBlip: React.PropTypes.func
};

export default function Channel(props) {

  let {blips, mute} = props.channel.state;
  let {currentBeat, onClickBlip} = props;

  let blipComs = blips.map((blip) =>
    React.createElement(BlipCom, {
      key: blip.id,
      blip,
      isPlaying: currentBeat === blip.state.beat,
      onClick: onClickBlip
    })
  );

  let classes = classNames({
    channel: true,
    mute
  });

  return <div className={classes}>{blipComs}</div>;
};

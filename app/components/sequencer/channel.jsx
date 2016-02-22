import React from 'react';
import BlipCom from './blip';

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  onClickBlip: React.PropTypes.func
};

export default function Channel(props) {
  let {state} = props.channel;
  let blips = state.blips.map((blip) => {
    let blipProps = {
      key: blip.id,
      blip: blip,
      isPlaying: !state.mute && props.currentBeat === blip.state.beat,
      onClick: props.onClickBlip
    };
    return <BlipCom {...blipProps} />;
  });
  return <div className="blips-container">{blips}</div>;
};

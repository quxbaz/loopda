import React from 'react';
import store from 'app/store';
import BlipComponent from './blip';

export default function Channel(props) {
  let {state} = props.channel;
  let blips = state.blips.map((blip) => {
    let blipProps = {
      key: blip.id,
      blip: blip,
      bindTo: blip,
      isPlaying: !state.mute && props.currentBeat === blip.state.beat
    };
    return <BlipComponent {...blipProps} />;
  });
  return <div className="blips-container">{blips}</div>;
};

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  currentBeat: React.PropTypes.number.isRequired
};

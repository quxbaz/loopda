import React from 'react';
import store from 'app/store';
import BlipComponent from './blip';

export default function(props) {
  let blips = props.blips.map((blip, i) => {
    let blipProps = {
      key: blip.id,
      model: blip,
      bindTo: blip,
      record: store.recordFor(blip),
      isPlaying: !props.mute && props.currentBeat === i,
      tuner: props.tuner
    };
    return <BlipComponent {...blipProps} />;
  });
  return <div className="blips-container">{blips}</div>;
};

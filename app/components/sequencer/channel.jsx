import React from 'react';
import store from 'app/store';
import BlipComponent from './blip';

export default function Channel(props) {
  let {blips} = props.channel.state;
  let blipComponents = blips.map((blip, i) => {
    let blipProps = {
      key: blip.id,
      model: blip,
      bindTo: blip,
      record: store.recordFor(blip),
      isPlaying: !props.mute && props.currentBeat === i
    };
    return <BlipComponent {...blipProps} />;
  });
  return <div className="blips-container">{blipComponents}</div>;
};

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired
};

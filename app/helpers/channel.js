import React from 'react';
import BlipComponent from 'components/sequencer/blip';

export default {

  renderBlips(component) {
    let {model} = component.props;
    return model.state.blips.map((blip, i) => {
      let props = {
        key: blip.id,
        model: blip,
        isPlaying: !model.state.mute && component.props.currentBeat == i,
        tuner: component.props.tuner
      };
      return <BlipComponent {...props} />;
    });
  }

};

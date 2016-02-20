import React from 'react';
import BlipComponent from 'components/sequencer/blip';
import store from 'app/store';

export default {

  renderBlips(component) {
    let {model} = component.props;
    return model.state.blips.map((blip, i) => {
      let props = {
        key: blip.id,
        model: blip,
        bindTo: blip,
        record: store.recordFor(blip),
        isPlaying: !model.state.mute && component.props.currentBeat == i,
        tuner: component.props.tuner
      };
      return <BlipComponent {...props} />;
    });
  }

};

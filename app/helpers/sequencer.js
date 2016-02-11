import React from 'react';
import ChannelComponent from 'components/sequencer/channel';
import sampleList from 'audio/samplelist';
import store from 'app/store';

export default {

  renderTuners(component) {
    return component.state.tuners.map((tuner) => {
      let handler = component.setTuner.bind(component, tuner);
      return <a key={tuner} onClick={handler}>{tuner} / </a>
    });
  },

  renderChannels(component) {
    let {model} = component.props;
    let {tuner} = component.state;
    return model.state.channels.map((channel) => {
      let props = {
        key: channel.id,
        model: channel,
        record: store.recordFor(channel),
        currentBeat: model.state.currentBeat,
        tuner,
        onRemove: component.removeChannel.bind(component, channel)
      };
      return <ChannelComponent {...props} />;
    });
  },

  renderSampleOptions(component) {
    return Object.keys(sampleList).map((sampleName) => {
      let props = {
        key: sampleName,
        className: 'sample-option',
        onClick: component.addChannel.bind(component, sampleName)
      };
      return <a {...props}>{sampleName}</a>;
    });
  }

};

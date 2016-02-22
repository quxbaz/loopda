import React from 'react';
import ChannelComponent from 'components/sequencer/channel';
import MixerComponent from './mixer';

export default React.createClass({

  propTypes: {
    sequencer: React.PropTypes.object,
    channel: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      selection: null
    };
  },

  onClickBlip(blip) {
    this.setState({
      selection: blip
    });
  },

  render() {
    let {channel} = this.props;
    let {currentBeat} = this.props.sequencer.state;
    return React.createElement(ChannelComponent, {
      channel,
      currentBeat,
      onClickBlip: this.onClickBlip,
      MixerComponent
    });
  }

});

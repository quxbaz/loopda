import React from 'react';
import ChannelCom from 'components/sequencer/channel';
import MixerCom from './mixer';

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
    return React.createElement(ChannelCom, {
      channel,
      currentBeat,
      onClickBlip: this.onClickBlip,
      MixerCom
    });
  }

});

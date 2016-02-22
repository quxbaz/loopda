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
    let {channel, sequencer} = this.props;
    let channelProps = {
      channel,
      currentBeat: sequencer.state.currentBeat,
      onClickBlip: this.onClickBlip
    };
    return (
      <div>
        <ChannelCom {...channelProps} />
        <MixerCom />
      </div>
    );
  }

});

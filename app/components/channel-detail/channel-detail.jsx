import React from 'react';
import ChannelCom from 'components/sequencer/channel';
import MixerCom from './mixer';

export default React.createClass({

  propTypes: {
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

  renderMixer() {
    if (this.state.selection)
      return <MixerCom blip={this.state.selection} />;
  },

  render() {
    let {channel} = this.props;
    return (
      <div className="channel-detail">
        <ChannelCom channel={channel} soloMode={false} onClickBlip={this.onClickBlip} />
        {this.renderMixer()}
      </div>
    );
  }

});

import React from 'react';
import Channel from 'components/sequencer/channel';
import Mixer from 'components/mixer/mixer';

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
      return <Mixer blip={this.state.selection} />;
  },

  render() {
    let {channel} = this.props;
    return (
      <div className="channel-detail">
        <Channel channel={channel} soloMode={false} onClickBlip={this.onClickBlip} />
        {this.renderMixer()}
      </div>
    );
  }

});

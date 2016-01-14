import React from 'react';
import BlipComponent from './blip';

export default React.createClass({

  componentWillMount() {
    this.props.channel.onStateChange(() => {
      this.forceUpdate();
    });
  },

  componentWillUnmount() {
    // <TODO> Detach event handlers
  },

  render() {
    let channel = this.props.channel;
    // <TODO> Use ids instead of indexes for keys.
    let blipNodes = channel.state.blips.map((blip, i) => {
      return <BlipComponent key={i} blip={blip} onBeat={this.props.currentBeat == i} />
    });
    return (
      <div className="channel">
        <div className="channel-title">{channel.state.sampleName}</div>
        <div className="inner-channel">
          <div className="blips-container">
            {blipNodes}
          </div>
        </div>
      </div>
    );
  }

});

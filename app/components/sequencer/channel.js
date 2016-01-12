import React from 'react';
import BlipComponent from './blip';

export default React.createClass({

  componentWillMount() {
    let channel = this.props.channel;
    this.setState(channel.state);
    channel.onStateChange((newState) => {
      this.setState(newState);
    });
  },

  componentWillUnmount() {
    // <TODO> Detach event handlers
  },

  render() {
    // <TODO> Use ids instead of indexes for keys.
    let blipNodes = this.state.blips.map((blip, i) => {
      return <BlipComponent key={i} blip={blip} playing={this.props.currentBeat == i} />
    });
    return (
      <div className="channel">
        <div className="channel-title">{this.state.sampleName}</div>
        <div className="blips">
          {blipNodes}
        </div>
      </div>
    );
  }

});

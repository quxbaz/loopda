import React from 'react';
import BlipComponent from './blip';

export default React.createClass({

  componentWillMount() {
    this.props.model.onStateChange(() => {
      this.forceUpdate();
    });
  },

  componentWillUnmount() {
    this.props.model.offStateChange(this.update);
  },

  render() {
    let model = this.props.model;
    // <TODO> Use ids instead of indexes for keys.
    let blipNodes = model.state.blips.map((blip, i) => {
      let props = {
        model: blip,
        key: i,
        isPlaying: this.props.currentBeat == i,
        tuner: this.props.tuner
      };
      return <BlipComponent {...props} />
    });
    return (
      <div className="channel">
        <div className="channel-title">{model.state.sampleName}</div>
        <div className="inner-channel">
          <div className="blips-container">
            {blipNodes}
          </div>
        </div>
      </div>
    );
  }

});

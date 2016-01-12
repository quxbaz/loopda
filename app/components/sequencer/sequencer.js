import React from 'react';
import ChannelComponent from './channel';

export default React.createClass({

  componentWillMount() {
    let sequencer = this.props.sequencer;
    this.setState(sequencer.state);
    sequencer.onStateChange((newState) => {
      this.setState(newState);
    });
  },

  componentWillUnmount() {
    // <TODO> Detach event handlers
  },

  togglePlay() {
    let sequencer = this.props.sequencer;
    sequencer.setState({playing: !sequencer.state.playing});
  },

  addChannel(sampleName, event) {
    this.props.sequencer.addChannel({sampleName});
  },

  render() {

    let channels = this.state.channels.map((channel, i) => {
      let props = {
        key: i,
        channel,
        currentBeat: this.state.currentBeat
      };
      return <ChannelComponent {...props} />;
    });

    let sampleOptions = this.props.sampleNames.map((sampleName, key) => {
      let props = {
        key       : sampleName,
        className : 'sample-option',
        onClick   : this.addChannel.bind(this, sampleName)
      };
      return <a {...props}>{sampleName}</a>;
    });

    return (
      <div className="sequencer">
        <a className="togglePlay" onClick={this.togglePlay}>
          {this.state.playing ? 'Pause' : 'Play'}
        </a>
        <div className="channels">
          {channels}
          <div className="add-channel">
            <div>
              <h4>Add a channel</h4>
              <div>{sampleOptions}</div>
            </div>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    );

  }

});

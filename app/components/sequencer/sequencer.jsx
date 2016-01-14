import React from 'react';
import ChannelComponent from 'sequencer/channel/channel';

export default React.createClass({

  componentWillMount() {
    this.props.sequencer.onStateChange(() => {
      this.forceUpdate();
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

    let sequencer = this.props.sequencer;

    let channels = sequencer.state.channels.map((channel, i) => {
      let props = {
        key: i,
        channel,
        currentBeat: sequencer.state.currentBeat
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
          {sequencer.state.playing ? 'Pause' : 'Play'}
        </a>
        <div className="channels">
          {channels}
          <div className="add-channel">
            <div>&nbsp;</div>
            <div className="inner">
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

import React from 'react';
import ChannelComponent from './channel';

let tuners = ['gain', 'rate'];

export default React.createClass({

  getInitialState() {
    return {
      tuner: 'rate'
    };
  },

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

  setTuner(tuner) {
    this.setState({tuner});
  },

  render() {

    let sequencer = this.props.sequencer;

    let tunerNodes = tuners.map(tuner =>
      <a key={tuner} onClick={this.setTuner.bind(this, tuner)}>{tuner} / </a>
    );

    let channelNodes = sequencer.state.channels.map((channel, i) => {
      let props = {
        key: i,
        channel,
        currentBeat: sequencer.state.currentBeat,
        tuner: this.state.tuner
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
          {sequencer.state.playing ? 'pause' : 'play'}
        </a>
        <br /><br />
        <div>{tunerNodes}</div>
        <div>Current tuner: {this.state.tuner}</div>
        <br /><br />
        <div className="channels">
          {channelNodes}
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

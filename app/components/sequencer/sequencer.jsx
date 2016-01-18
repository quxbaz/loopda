import React from 'react';
import modelUpdate from 'components/mixins/modelupdate';
import ChannelComponent from './channel';

let tuners = ['gain', 'rate'];

export default React.createClass({

  mixins: [modelUpdate],

  getInitialState() {
    return {
      tuner: 'rate'
    };
  },

  togglePlay() {
    let model = this.props.model;
    model.setState({playing: !model.state.playing});
  },

  addChannel(sampleName) {
    this.props.model.addChannel({sampleName});
  },

  removeChannel(channel) {
    let channels = this.props.model.state.channels;
    this.props.model.setState({
      channels: channels.filter(item => item !== channel)
    });
  },

  setTuner(tuner) {
    this.setState({tuner});
  },

  render() {

    let model = this.props.model;

    let tunerNodes = tuners.map(tuner =>
      <a key={tuner} onClick={this.setTuner.bind(this, tuner)}>{tuner} / </a>
    );

    let channelNodes = model.state.channels.map((channel) => {
      let props = {
        key: channel.state.id,
        model: channel,
        currentBeat: model.state.currentBeat,
        tuner: this.state.tuner,
        onRemove: this.removeChannel
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
          {model.state.playing ? 'pause' : 'play'}
        </a>
        <br /><br />
        <div>{tunerNodes}</div>
        <div>Tuning mode: {this.state.tuner}</div>
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

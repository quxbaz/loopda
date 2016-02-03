import React from 'react';
import modelUpdate from 'components/mixins/modelupdate';
import ChannelComponent from './channel';
import sampleList from 'audio/samplelist';
import {keys, initial, last} from 'lib/util';
import actions from 'actions/sequencer/actions';

let tuners = ['gain', 'rate', 'offset'];

export default React.createClass({

  mixins: [modelUpdate],

  getInitialState() {
    return {
      tuner: 'rate',
      removedChannels: []
    };
  },

  togglePlay() {
    let {model} = this.props;
    model.setState({playing: !model.state.playing});
  },

  addChannel(sampleName) {
    actions.createChannel({
      sampleName,
      sequencer: this.props.model,
    });
  },

  removeChannel(channel) {
    this.setState({
      removedChannels: this.state.removedChannels.concat(channel)
    });
    let channels = this.props.model.state.channels;
    this.props.model.setState({
      channels: channels.filter(item => item !== channel)
    });
  },

  restoreChannel() {
    /*
      Undos a removeChannel action.
    */
    let removedChannels = this.state.removedChannels;
    if (removedChannels.length == 0)
      return;
    let model = this.props.model;
    let restore = last(removedChannels);
    let channels = model.state.channels.concat(restore);
    model.setState({channels});
    this.setState({
      removedChannels: initial(removedChannels)
    });
  },

  setTuner(tuner) {
    this.setState({tuner});
  },

  render() {

    let model = this.props.model;

    // // <TODO> Render this using a viewmodel
    let tunerNodes = tuners.map(tuner =>
      <a key={tuner} onClick={this.setTuner.bind(this, tuner)}>{tuner} / </a>
    );

    // <TODO> Render this using a viewmodel
    let channelNodes = model.state.channels.map((channel) => {
      return (<ChannelComponent key={channel.id} model={channel}
        currentBeat={model.state.currentBeat}
        tuner={this.state.tuner}
        onRemove={this.removeChannel} />);
    });

    // // <TODO> Render this using a viewmodel
    let sampleOptions = keys(sampleList).map(
      sampleName => (<a key={sampleName} className="sample-option"
                        onClick={this.addChannel.bind(this, sampleName)}>{sampleName}</a>)
    );

    return (
      <div className="sequencer">
        <a className="togglePlay" onClick={this.togglePlay}>
          {model.state.playing ? 'pause' : 'play'}
        </a>
        <br /><br />
        <div>{tunerNodes}</div>
        <div>Tuning mode: {this.state.tuner}</div>
        <br /><br />
        <a onClick={this.restoreChannel}>Restore channel</a>
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

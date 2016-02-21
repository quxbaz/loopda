/*
  Overview component
*/

import React from 'react';
import sequencerCtrl from 'controllers/sequencer/sequencer';
import ChannelsComponent from './channels';
import SampleOptionsComponent from './sample-options';

export default React.createClass({

  // getInitialState() {
  //   return {
  //     tuners: ['gain', 'rate', 'offset'],
  //     tuner: 'rate'
  //   };
  // },

  togglePlay() {
    sequencerCtrl.togglePlay(this.props.sequencer);
  },

  addChannel(sampleName) {
    sequencerCtrl.createChannel(this.props.sequencer, sampleName);
  },

  removeChannel(channel) {
    sequencerCtrl.removeChannel(this.props.sequencer, channel);
  },

  // This should be in app state
  // setTuner(tuner) {
  //   this.setState({tuner});
  // },

  render() {
    let {sequencer} = this.props;
    let {channels, currentBeat} = sequencer.state;
    return (
      <div className="sequencer">
        <a className="togglePlay" onClick={this.togglePlay}>
          {this.props.sequencer.state.playing ? 'pause' : 'play'}
        </a>
        <hr />
        {/*<div>{this.renderTuners(this)}</div>*/}
        {/*<div>Tuning mode: {this.state.tuner}</div>*/}
        <hr />
        <div className="channels">
          <ChannelsComponent channels={channels} currentBeat={currentBeat} onRemove={this.removeChannel} />
          <div className="add-channel">
            <div>&nbsp;</div>
            <div className="inner">
              <h4>Add a channel</h4>
              <SampleOptionsComponent onClick={this.addChannel} />
            </div>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    );
  }

});

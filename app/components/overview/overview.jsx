/*
  Overview component
*/

import React from 'react';
import sequencerCtrl from 'controllers/sequencer/sequencer';
import ChannelGridComponent from './channel-grid';
import SampleOptionsComponent from './sample-options';

export default React.createClass({

  propTypes: {
    sequencer: React.PropTypes.object
  },

  togglePlay() {
    sequencerCtrl.togglePlay(this.props.sequencer);
  },

  addChannel(sampleName) {
    sequencerCtrl.createChannel(this.props.sequencer, sampleName);
  },

  removeChannel(channel) {
    sequencerCtrl.removeChannel(this.props.sequencer, channel);
  },

  render() {
    let {sequencer} = this.props;
    let {channels, currentBeat} = sequencer.state;
    return (
      <div className="sequencer">
        <a className="togglePlay" onClick={this.togglePlay}>
          {this.props.sequencer.state.playing ? 'pause' : 'play'}
        </a>
        <hr />
        <div className="channels">
          <ChannelGridComponent channels={channels} currentBeat={currentBeat} onRemove={this.removeChannel} />
          <div className="add-channel">
            <div>&nbsp;</div>
            <div className="inner">
              <h4>Add a channel</h4>
              <SampleOptionsComponent onClickOption={this.addChannel} />
            </div>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    );
  }

});

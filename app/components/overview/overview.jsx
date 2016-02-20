/*
  Overview component
*/

import React from 'react';
import {toggleState} from 'lib/util';
import dispatcher from 'app/dispatcher';
import sequencerActions from 'actions/sequencer/sequencer';
import ChannelsComponent from './channels';
import SampleOptionsComponent from './sample-options';

export default React.createClass({

  // getInitialState() {
  //   return {
  //     tuners: ['gain', 'rate', 'offset'],
  //     tuner: 'rate'
  //   };
  // },

  addChannel(sampleName) {
    dispatcher.emit(sequencerActions.createChannel, this.props.sequencer, sampleName);
  },

  removeChannel(channel) {
    dispatcher.emit(sequencerActions.removeChannel, this.props.sequencer, channel);
  },

  // This should be in app state
  // setTuner(tuner) {
  //   this.setState({tuner});
  // },

  render() {
    let togglePlay = toggleState.bind({}, this.props.sequencer, 'playing');
    let {sequencer} = this.props;
    let {channels, currentBeat} = sequencer.state;
    return (
      <div className="sequencer">
        <a className="togglePlay" onClick={togglePlay}>
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

/*
  Overview component
*/

import React from 'react';
import bindTo from 'components/mixins/bindto';
import {toggleState} from 'lib/util';
import dispatcher from 'app/dispatcher';
import sequencerActions from 'actions/sequencer/sequencer';
import sampleList from 'audio/samplelist';
import store from 'app/store';
import ChannelComponent from 'components/sequencer/channel';

export default React.createClass({

  mixins: [bindTo],

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

  renderChannels() {
    let {sequencer} = this.props;
    return sequencer.state.channels.map((channel) => {
      let props = {
        key: channel.id,
        model: channel,
        bindTo: channel,
        record: store.recordFor(channel),
        currentBeat: sequencer.state.currentBeat,
        tuner: 'gain',
        onRemove: this.removeChannel.bind(this, channel)
      };
      return <ChannelComponent {...props} />;
    });
  },

  renderSampleOptions() {
    return Object.keys(sampleList).map((sampleName) => {
      let props = {
        key: sampleName,
        className: 'sample-option',
        onClick: this.addChannel.bind(this, sampleName)
      };
      return <a {...props}>{sampleName}</a>;
    });
  },

  render() {
    let togglePlay = toggleState.bind({}, this.props.sequencer, 'playing');
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
          {this.renderChannels(this)}
          <div className="add-channel">
            <div>&nbsp;</div>
            <div className="inner">
              <h4>Add a channel</h4>
              <div>{this.renderSampleOptions(this)}</div>
            </div>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    );
  }

});

import React from 'react';
import modelUpdate from 'components/mixins/modelupdate';
import {keys, initial, last, toggleState} from 'lib/util';
import sequencerActions from 'actions/sequencer/actions';
import helper from 'helpers/sequencer';

export default React.createClass({

  mixins: [modelUpdate],

  getInitialState() {
    return {
      tuners: ['gain', 'rate', 'offset'],
      tuner: 'rate',
      removedChannels: []
    };
  },

  addChannel(sampleName) {
    sequencerActions.createChannel(this.props.model, sampleName);
  },

  removeChannel(channel) {
    sequencerActions.removeChannel(this.props.model, channel);
    this.setState({
      removedChannels: [...this.state.removedChannels, channel]
    });
  },

  restoreChannel() {
    /*
      Undos a removeChannel action.
    */
    let {removedChannels} = this.state;
    if (removedChannels.length == 0)
      return;
    let {model} = this.props;
    let restore = last(removedChannels);
    model.setState({channels: model.state.channels.concat(restore)});
    this.setState({removedChannels: initial(removedChannels)});
  },

  setTuner(tuner) {
    this.setState({tuner});
  },

  render() {
    let togglePlay = toggleState.bind({}, this.props.model, 'playing');
    return (
      <div className="sequencer">
        <a className="togglePlay" onClick={togglePlay}>
          {this.props.model.state.playing ? 'pause' : 'play'}
        </a>
        <hr />
        <div>{helper.renderTuners(this)}</div>
        <div>Tuning mode: {this.state.tuner}</div>
        <hr />
        <a onClick={this.restoreChannel}>Restore channel</a>
        <hr />
        <div className="channels">
          {helper.renderChannels(this)}
          <div className="add-channel">
            <div>&nbsp;</div>
            <div className="inner">
              <h4>Add a channel</h4>
              <div>{helper.renderSampleOptions(this)}</div>
            </div>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    );
  }

});

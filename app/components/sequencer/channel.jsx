import React from 'react';
import classNames from 'classnames';
import bindTo from 'components/mixins/bindto';
import channelCtrl from 'controllers/sequencer/channel';
import BlipsComponent from './blips';

export default React.createClass({

  mixins: [bindTo],

  remove() {
    this.props.onRemove(this.props.model);
  },

  viewChannelDetail() {
    channelCtrl.viewChannelDetail(this.props.model);
  },

  toggleMute() {
    channelCtrl.toggleMute(this.props.model);
  },

  render() {
    let {model, record, currentBeat, tuner} = this.props;
    let classes = classNames({
      channel: true,
      mute: model.state.mute
    });
    let blipsProps = {
      blips: model.state.blips,
      mute: model.state.mute,
      currentBeat,
      tuner
    };
    return (
      <div className={classes}>
        <div className="channel-title">
          <div>
            <a onClick={this.viewChannelDetail}>{record.state.title}</a>
          </div>
          {model.state.sampleName} -
          (<a onClick={this.remove}>remove</a>) -
          (<a onClick={this.toggleMute}>
            {model.state.mute ? 'unmute' : 'mute'}
          </a>)
        </div>
        <div className="inner-channel">
          <BlipsComponent {...blipsProps} />
        </div>
      </div>
    );
  }

});

import React from 'react';
import classNames from 'classnames';
import bindTo from 'components/mixins/bindto';
import channelCtrl from 'controllers/sequencer/channel';
import ChannelComponent from 'components/sequencer/channel';

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
    let {model, record} = this.props;
    let classes = classNames({
      channel: true,
      mute: model.state.mute
    });
    let channelProps = {
      channel: model,
      currentBeat: this.props.currentBeat
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
          <ChannelComponent {...channelProps} />
        </div>
      </div>
    );
  }

});

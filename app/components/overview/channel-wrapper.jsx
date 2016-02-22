import React from 'react';
import classNames from 'classnames';
import channelCtrl from 'controllers/sequencer/channel';
import blipCtrl from 'controllers/sequencer/blip';
import ChannelComponent from 'components/sequencer/channel';

export default React.createClass({

  propTypes: {
    channel: React.PropTypes.object.isRequired,
    currentBeat: React.PropTypes.number.isRequired,
  },

  remove() {
    this.props.onRemove(this.props.channel);
  },

  viewChannelDetail() {
    channelCtrl.viewChannelDetail(this.props.channel);
  },

  toggleMute() {
    channelCtrl.toggleMute(this.props.channel);
  },

  render() {
    let {channel, record} = this.props;
    let classes = classNames({
      channel: true,
      mute: channel.state.mute
    });
    let channelProps = {
      channel,
      currentBeat: this.props.currentBeat,
      onClickBlip: blipCtrl.toggleMute
    };
    return (
      <div className={classes}>
        <div className="channel-title">
          <div>
            <a onClick={this.viewChannelDetail}>{record.state.title}</a>
          </div>
          {channel.state.sampleName} -
          (<a onClick={this.remove}>remove</a>) -
          (<a onClick={this.toggleMute}>
            {channel.state.mute ? 'unmute' : 'mute'}
          </a>)
        </div>
        <div className="inner-channel">
          <ChannelComponent {...channelProps} />
        </div>
      </div>
    );
  }

});

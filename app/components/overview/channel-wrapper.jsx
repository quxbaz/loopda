import React from 'react';
import store from 'globals/store';
import ChannelCtrl from 'controllers/sequencer/channel';
import BlipCtrl from 'controllers/sequencer/blip';
import ChannelCom from 'components/sequencer/channel';

ChannelWrapper.propTypes = {
  channel: React.PropTypes.object.isRequired,
  onRemove: React.PropTypes.func
};

export default function ChannelWrapper(props) {
  let {channel} = props;
  let record = store.recordFor(channel);
  // Event handlers
  let viewChannelDetail = () => ChannelCtrl.viewChannelDetail(channel);
  let remove = () => props.onRemove(channel);
  let toggleMute = () => ChannelCtrl.toggleMute(channel);
  return (
    <div className="channel-wrapper">
      <div className="channel-info">
        <a onClick={viewChannelDetail}>{record.state.title}</a>
        <a onClick={remove}>remove</a>
        <a onClick={toggleMute}>
          {channel.state.mute ? 'unmute' : 'mute'}
        </a>
      </div>
      <ChannelCom channel={channel} onClickBlip={BlipCtrl.toggleMute} />
    </div>
  );
};

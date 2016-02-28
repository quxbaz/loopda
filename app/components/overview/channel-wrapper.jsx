import React from 'react';
import store from 'globals/store';
import ChannelCtrl from 'controllers/sequencer/channel';
import BlipCtrl from 'controllers/sequencer/blip';
import ChannelCom from 'components/sequencer/channel';
import Icon from 'components/ui/icon';

ChannelWrapper.propTypes = {
  channel: React.PropTypes.object.isRequired,
  onRemove: React.PropTypes.func
};

export default function ChannelWrapper(props) {

  let {channel} = props;
  let {mute} = channel.state;
  let {title} = store.recordFor(channel).state;

  // Event handlers
  let viewChannelDetail = () => ChannelCtrl.viewChannelDetail(channel);
  let removeChannel = () => props.onRemove(channel);
  let toggleMute = () => ChannelCtrl.toggleMute(channel);
  let toggleSolo = () => ChannelCtrl.toggleSolo(channel);

  return (
    <div className="channel-wrapper">
      <div className="channel-info">
        <div className="color-box" style={{background: channel.state.color}} />
        <a className="channel-title" onClick={viewChannelDetail}>{title}</a>
        <div className="channel-controls">
          <a onClick={removeChannel} className="remove-channel"><Icon name="trash" /></a>
          <a onClick={toggleSolo}>Solo</a>
          <a onClick={toggleMute}>Mute</a>
        </div>
      </div>
      <ChannelCom channel={channel} onClickBlip={BlipCtrl.toggleMute} />
    </div>
  );

};

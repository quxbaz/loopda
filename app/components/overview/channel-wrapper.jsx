import React from 'react';
import ChannelCtrl from 'controllers/sequencer/channel';
import BlipCtrl from 'controllers/sequencer/blip';
import ChannelCom from 'components/sequencer/channel';
import Icon from 'components/ui/icon';
import Button from 'components/ui/button';

ChannelWrapper.propTypes = {
  channel: React.PropTypes.object.isRequired,
  soloMode: React.PropTypes.bool.isRequired,
  onRemove: React.PropTypes.func
};

export default function ChannelWrapper(props) {

  let {channel, soloMode} = props;
  let {number, title, solo, mute, color} = channel.state;

  // Event handlers
  let viewChannelDetail = () => ChannelCtrl.viewChannelDetail(channel);
  let removeChannel = () => props.onRemove(channel);
  let toggleSolo = () => ChannelCtrl.toggleSolo(channel);
  let toggleMute = () => ChannelCtrl.toggleMute(channel);

  return (
    <div className="channel-wrapper">
      <div className="channel-info">
        <div className="color-box" style={{background: color}} />
        <a className="channel-text" onClick={viewChannelDetail}>
          <div className="channel-number">{number}</div>
          <div className="channel-title">{title}</div>
        </a>
        <div className="channel-controls">
          <a className="remove-channel" onClick={removeChannel}><Icon name="trash" /></a>
          <Button state={solo} onClick={toggleSolo}>Solo</Button>
          <Button state={mute} onClick={toggleMute}>Mute</Button>
        </div>
      </div>
      <ChannelCom channel={channel} soloMode={soloMode} onClickBlip={BlipCtrl.toggleMute} />
    </div>
  );

};

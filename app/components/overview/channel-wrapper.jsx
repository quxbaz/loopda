import React from 'react';
import ChannelCtrl from 'controllers/sequencer/channel';
import BlipCtrl from 'controllers/sequencer/blip';
import ManagerCtrl from 'controllers/preset/manager';
import SongCtrl from 'controllers/editor/song';
import Channel from 'components/sequencer/channel';
import Icon from 'components/ui/icon';
import Button from 'components/ui/button';

ChannelWrapper.propTypes = {
  channel: React.PropTypes.object.isRequired,
  soloMode: React.PropTypes.bool.isRequired,
  songMode: React.PropTypes.bool
};

export default function ChannelWrapper(props) {

  let {channel, soloMode, songMode} = props;
  let {number, title, solo, mute, color} = channel.state;

  // Event handlers
  let viewPreset = () => ManagerCtrl.viewPreset(channel.take('preset'));
  let archiveChannel = () => ChannelCtrl.archive(channel);
  let toggleSolo = () => ChannelCtrl.toggleSolo(channel);
  let toggleMute = () => ChannelCtrl.toggleMute(channel);
  let handleClickOverlay = () => SongCtrl.setChannel(channel);

  return (
    <div className="channel-wrapper">
      <div className="channel-info">
        <div className="color-box" style={{background: color}} />
        <div className="channel-text">
          <div className="channel-number hide">{number}</div>
          <div className="channel-title clicky" onClick={viewPreset}>{title} ({number})</div>
          <a className="archive-channel" onClick={archiveChannel}><Icon name="x" /></a>
        </div>
        <div className="channel-controls">
          <Button className="solo-button" state={solo} onClick={toggleSolo}>Solo</Button>
          <Button state={mute} onClick={toggleMute}>Mute</Button>
        </div>
      </div>
      <Channel channel={channel} soloMode={soloMode} onClickBlip={BlipCtrl.toggleMute} />
      {songMode ? <div className="channel-wrapper-overlay" onClick={handleClickOverlay} /> : ''}
    </div>
  );

};

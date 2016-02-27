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
  let remove = () => props.onRemove(channel);
  let toggleMute = () => ChannelCtrl.toggleMute(channel);
  let toggleSolo = () => ChannelCtrl.toggleSolo(channel);

  return (
    <div className="channel-wrapper">
      <div className="channel-info">
        <a onClick={viewChannelDetail}>{title}</a>
        {/*<a onClick={remove}>
          <Icon name="x" classes={{warning: true}} />
        </a>*/}
        <a onClick={toggleMute}>
          <Icon name={mute ? 'volume-low' : 'volume-high'} />
        </a>
        {/*<a onClick={toggleSolo}>
          <Icon name="star" />
        </a>*/}
      </div>
      <ChannelCom channel={channel} onClickBlip={BlipCtrl.toggleMute} />
    </div>
  );

};

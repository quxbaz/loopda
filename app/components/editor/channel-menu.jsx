import React from 'react';
import Channel from 'components/sequencer/channel';

ChannelMenu.propTypes = {
  channels: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func,
  onEmpty: React.PropTypes.func
};

export default function ChannelMenu(props) {
  let {channels, onSelect, onEmpty} = props;
  let render = {};
  render.channels = channels.map((channel) => {
    let handleClick = () => onSelect(channel);
    return React.createElement(Channel, {
      key: channel.cid,
      channel,
      onClick: onSelect
    });
  });
  return (
    <div className="editor-channel-menu">
      <div onClick={onEmpty}>Empty</div>
      {render.channels}
    </div>
  );
}

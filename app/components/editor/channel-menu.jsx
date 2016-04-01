import React from 'react';
import Channel from 'components/sequencer/channel';

ChannelMenu.propTypes = {
  channels: React.PropTypes.array.isRequired,
  offset: React.PropTypes.array,
  onSelect: React.PropTypes.func,
  onEmpty: React.PropTypes.func
};

ChannelMenu.defaultProps = {
  offset: [0, 0]
};

export default function ChannelMenu(props) {
  let {channels, offset, onSelect, onEmpty} = props;
  let render = {};
  render.channels = channels.map((channel) => {
    return (
      <div key={channel.id} className="channel-option" onClick={() => onSelect(channel)}>
        <div className="channel-tag">
          {channel.state.title} ({channel.state.number})
        </div>
        <Channel channel={channel} />
      </div>
    );
  });
  let style = {
    left: offset[0],
    top: offset[1]
  };
  return (
    <div className="editor-channel-menu" style={style}>
      <div className="empty-option" onClick={onEmpty}>Empty</div>
      {render.channels}
    </div>
  );
}

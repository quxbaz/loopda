import React from 'react';
import SequencerCtrl from 'controllers/sequencer/sequencer';
import ChannelCtrl from 'controllers/sequencer/channel';
import Channel from 'components/sequencer/channel';

ArchivedChannel.propTypes = {
  sequencer: React.PropTypes.object.isRequired,
  channel: React.PropTypes.object.isRequired
};

export default function ArchivedChannel(props) {

  let {sequencer, channel} = props;
  let {title, number, blips} = channel.state;

  let handleDismiss = () => SequencerCtrl.removeChannel(sequencer, channel);
  let handleUndo = () => ChannelCtrl.restore(channel);

  return (
    <div className="archived-channel">
      <div className="archived-channel-info">
        <span>{title}</span>
        <div className="archived-channel-controls">
          <a onClick={handleDismiss}>Dismiss</a>
          <a onClick={handleUndo}>Undo</a>
        </div>
      </div>
      <Channel channel={channel} soloMode={false} />
    </div>
  );

};

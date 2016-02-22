import React from 'react';
import ChannelComponent from 'components/sequencer/channel';

ChannelDetail.propTypes = {
  sequencer: React.PropTypes.object,
  channel: React.PropTypes.object.isRequired
};

export default function ChannelDetail(props) {
  let {channel} = props;
  let {currentBeat} = props.sequencer.state;
  return <ChannelComponent channel={channel} currentBeat={currentBeat} />;
};

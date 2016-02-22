import React from 'react';
import ChannelComponent from 'components/sequencer/channel';

export default function ChannelDetail(props) {
  let {channel} = props;
  let {currentBeat} = props.sequencer.state;
  return <ChannelComponent channel={channel} currentBeat={currentBeat} />;
};

ChannelDetail.propTypes = {
  sequencer: React.PropTypes.object,
  channel: React.PropTypes.object.isRequired
};

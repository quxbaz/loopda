import React from 'react';
import ChannelComponent from 'components/sequencer/channel';

ChannelDetail.propTypes = {
  sequencer: React.PropTypes.object,
  channel: React.PropTypes.object.isRequired
};

export default function ChannelDetail(props) {

  let {channel} = props;
  let {currentBeat} = props.sequencer.state;

  let onClickBlip = (blip) => {
    // TODO
    // (cursorController).addToBlipSelection(recordFor(blip))
  };

  return React.createElement(ChannelComponent, {
    channel, currentBeat, onClickBlip
  });

};

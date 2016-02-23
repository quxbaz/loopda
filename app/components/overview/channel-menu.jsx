import React from 'react';
import SampleOptionsCom from './sample-options';

ChannelMenu.PropTypes = {
  onClickOption: React.PropTypes.func
};

export default function ChannelMenu(props) {
  return (
    <div className="channel-menu">
      <h4>Add a channel</h4>
      <SampleOptionsCom onClickOption={props.onClickOption} />
    </div>
  );
};

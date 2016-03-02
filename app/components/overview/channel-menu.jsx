import React from 'react';
import SampleOptions from './sample-options';

ChannelMenu.PropTypes = {
  onClickOption: React.PropTypes.func
};

export default function ChannelMenu(props) {
  return (
    <div className="channel-menu">
      <h4>Add a channel</h4>
      <SampleOptions onClickOption={props.onClickOption} />
    </div>
  );
};

import React from 'react';
import SampleOptionsComponent from './sample-options';

ChannelMenu.PropTypes = {
  onClickOption: React.PropTypes.func
};

export default function ChannelMenu(props) {
  return (
    <div className="add-channel">
      <div>&nbsp;</div>
      <div className="inner">
        <h4>Add a channel</h4>
        <SampleOptionsComponent onClickOption={props.onClickOption} />
      </div>
    </div>
  );
};

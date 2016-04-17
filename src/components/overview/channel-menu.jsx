import React from 'react';
import PresetOptions from './preset-options';

ChannelMenu.PropTypes = {
  presets: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func
};

export default function ChannelMenu(props) {
  let {presets, onSelect} = props;
  return (
    <div className="channel-menu">
      <h4>Add a channel</h4>
      <PresetOptions presets={presets} onSelect={onSelect} />
    </div>
  );
};

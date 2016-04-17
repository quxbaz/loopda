import React from 'react';

PresetOptions.propTypes = {
  presets: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired
};

export default function PresetOptions(props) {
  let {presets, onSelect} = props;
  let options = presets.map((preset) => {
    let {title, sample} = preset.state;
    let myProps = {
      className: 'preset-option',
      onClick: () => props.onSelect(preset)
    };
    return (
      <div key={preset.cid}>
        <a {...myProps}>{title} ({sample})</a>
      </div>
    );
  });
  return <div>{options}</div>;
};

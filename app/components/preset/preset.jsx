import React from 'react';
import classNames from 'classnames';

Preset.propTypes = {
  preset: React.PropTypes.object.isRequired,
  selected: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

export default function Preset(props) {

  let {preset, onClick, selected} = props;
  let {title, sample} = preset.state;
  let handleClick = () => onClick(preset);

  let className = classNames({
    preset: true,
    selected
  });

  return (
    <div className={className}>
      <a onClick={handleClick}>
        {title} - ({sample})
      </a>
    </div>
  );

};

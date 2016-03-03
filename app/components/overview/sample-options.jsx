import React from 'react';
import samples from 'globals/samples';

SampleOptions.propTypes = {
  onClickOption: React.PropTypes.func.isRequired
};

export default function SampleOptions(props) {
  let options = Object.keys(samples).map((sampleName) => {
    let optionProps = {
      key: sampleName,
      className: 'sample-option',
      onClick: () => props.onClickOption(sampleName)
    };
    return <a {...optionProps}>{sampleName}</a>;
  });
  return <div>{options}</div>;
};

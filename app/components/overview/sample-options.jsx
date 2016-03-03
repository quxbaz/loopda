import React from 'react';
import {names} from 'globals/samples';

SampleOptions.propTypes = {
  onClickOption: React.PropTypes.func.isRequired
};

export default function SampleOptions(props) {
  let options = names.map((sampleName) => {
    let optionProps = {
      key: sampleName,
      className: 'sample-option',
      onClick: () => props.onClickOption(sampleName)
    };
    return <a {...optionProps}>{sampleName}</a>;
  });
  return <div>{options}</div>;
};

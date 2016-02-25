import React from 'react';
import sampleList from 'audio/samplelist';

SampleOptions.propTypes = {
  onClickOption: React.PropTypes.func.isRequired
};

export default function SampleOptions(props) {
  let options = Object.keys(sampleList).map((sampleName) => {
    let optionProps = {
      key: sampleName,
      className: 'sample-option',
      onClick: () => props.onClickOption(sampleName)
    };
    return <a {...optionProps}>{sampleName}</a>;
  });
  return <div>{options}</div>;
};

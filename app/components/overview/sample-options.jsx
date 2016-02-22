import React from 'react';
import sampleList from 'audio/samplelist';

export default function SampleOptions(props) {
  let options = Object.keys(sampleList).map((sampleName) => {
    let sampleProps = {
      key: sampleName,
      className: 'sample-option',
      onClick: props.onClickOption.bind(null, sampleName)
    };
    return <a {...sampleProps}>{sampleName}</a>;
  });
  return <div>{options}</div>;
};

SampleOptions.propTypes = {
  onClickOption: React.PropTypes.func.isRequired
};

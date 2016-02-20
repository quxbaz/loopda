import React from 'react';
import sampleList from 'audio/samplelist';

export default function(props) {
  let options = Object.keys(sampleList).map((sampleName) => {
    let sampleProps = {
      key: sampleName,
      className: 'sample-option',
      onClick: props.onClick.bind(null, sampleName)
    };
    return <a {...sampleProps}>{sampleName}</a>;
  });
  return <div>{options}</div>;
};

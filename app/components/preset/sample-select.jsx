import React from 'react';
import {samples} from 'globals/samples';
import {capitalize} from 'lib/util';

// All props pass through.
export default function SampleSelect(props) {
  let options = Object.keys(samples).map((sample) =>
    <option key={sample} value={sample}>{capitalize(sample)}</option>
  );
  return (
    <select {...props}>
      {options}
    </select>
  );
};

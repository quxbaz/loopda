import React, {PropTypes} from 'react'

const SampleSelect = ({value, samples, onChange}) => (
  <select value={value} onChange={onChange}>
    {samples.map((sample) =>
      <option key={sample} value={sample}>{sample}</option>
    )}
  </select>
)

SampleSelect.propTypes = {
  value: PropTypes.string.isRequired,
  samples: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SampleSelect

import React from 'react'

const SampleSelect = ({value, samples, onChange}) => (
  <select value={value} onChange={onChange}>
    {samples.map(sample =>
      <option key={sample} value={sample}>{sample}</option>
    )}
  </select>
)

SampleSelect.propTypes = {
  value: React.PropTypes.string.isRequired,
  samples: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
}

export default SampleSelect

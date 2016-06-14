import React, {PropTypes} from 'react'
import PresetItem from '../providers/PresetItem'

const PresetList = ({id, ids}) => (
  <ul className="preset-list">
    {ids.map((presetId) => (
      <PresetItem key={presetId} id={presetId} selected={presetId === id} />
    ))}
  </ul>
)

PresetList.propTypes = {
  id: PropTypes.string,
  ids: PropTypes.array.isRequired,
}

export default PresetList

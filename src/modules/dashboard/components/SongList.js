import React, {PropTypes} from 'react'
import SongItem from '../providers/SongItem'

const SongList = ({ids}) => (
  <div className="song-list">
    {ids.map((id) => (
      <SongItem key={id} id={id} />
    ))}
  </div>
)

SongList.propTypes = {
  ids: PropTypes.array.isRequired,
}

export default SongList

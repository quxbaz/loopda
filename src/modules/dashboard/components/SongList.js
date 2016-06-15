import React, {PropTypes} from 'react'
import SongItem from '../providers/SongItem'

const EmptyList = () => (
  React.DOM.em({}, "You don't have any songs yet")
)

const SongList = ({ids}) => (
  <div className="song-list">
    {ids.map((id) => (
      <SongItem key={id} id={id} />
    ))}
    {ids.length > 0 ? null : <EmptyList />}
  </div>
)

SongList.propTypes = {
  ids: PropTypes.array.isRequired,
}

export default SongList

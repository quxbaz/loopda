import React from 'react'
import PropTypes from 'prop-types'
import SongItem from '../providers/SongItem'

const EmptyList = () => (
  <em>You don't have any songs yet</em>
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

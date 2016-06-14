import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'

const SongHeader = ({id, title}) => (
  <h2>
    <a href={'/#/songs/' + id}>
      {title}
    </a>
  </h2>
)

SongHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

const mapStateToProps = (state, {id}) => {
  const song = songs.selectors.getById(id)(state)
  return {
    id,
    title: song.title,
  }
}

export default connect(mapStateToProps)(SongHeader)

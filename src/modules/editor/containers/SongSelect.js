import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import url from '../../url'

const SongSelect = ({value, songs, onChange}) => (
  <select value={value} onChange={onChange}>
    <option value="">--</option>
    {songs.map(song =>
      <option key={song.id} value={song.id}>{song.title}</option>
    )}
  </select>
)

SongSelect.propTypes = {
  value: React.PropTypes.string,
  songs: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  songs: songs.selectors.getAll(state)
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (event) => {
    dispatch(
      url.actions.setBrowserUrl('/songs/' + event.target.value)
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongSelect)

import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import url from '../../url'
import SongItem from '../components/SongItem'

const SongList = ({songs, onClickSongItem, onClickDestroySong}) => (
  <div className="song-list">
    {songs.map((song) => (
      <SongItem key={song.id} song={song}
        onClick={onClickSongItem}
        onClickDestroy={onClickDestroySong} />
    ))}
  </div>
)

SongList.propTypes = {
  songs: React.PropTypes.array.isRequired,
  onClickSongItem: React.PropTypes.func.isRequired,
  onClickDestroySong: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  songs: songs.selectors.getAll(state),
})

const mapDispatchToProps = (dispatch) => ({
  onClickSongItem: (id) => {
    dispatch(url.actions.setBrowserUrl('/songs/' + id))
  },
  onClickDestroySong: (id) => {
    dispatch(songs.actions.destroy(id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongList)

import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import url from '../../url'
import SongItem from '../components/SongItem'

const SongList = ({songs, onClickSongItem, onClickRemoveSong}) => (
  <div className="song-list">
    {songs.map((song) => (
      <SongItem key={song.id} song={song}
        onClick={onClickSongItem}
        onClickRemove={onClickRemoveSong} />
    ))}
  </div>
)

SongList.propTypes = {
  songs: React.PropTypes.array.isRequired,
  onClickSongItem: React.PropTypes.func.isRequired,
  onClickRemoveSong: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  songs: songs.selectors.getAll(state),
})

const mapDispatchToProps = (dispatch) => ({
  onClickSongItem: (id) => {
    dispatch(url.actions.setBrowserUrl('/songs/' + id))
    // dispatch(url.actions.navToSong(id))
  },
  onClickRemoveSong: (id) => {
    dispatch(songs.actions.removeSong(id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongList)

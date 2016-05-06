import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import url from '../../url'
import SongSelect from './SongSelect'
import Playback from '../components/Playback'

const Controls = ({id, onClickDelete, onClickRestart, onClickPlay, onClickStop}) => (
  <div className="editor-controls">
    <SongSelect value={id} />
    <button onClick={onClickDelete}>Delete song</button>
    <Playback onClickRestart={onClickRestart} onClickPlay={onClickPlay} onClickStop={onClickStop} />
  </div>
)

Controls.propTypes = {
  id: React.PropTypes.string.isRequired,
  onClickDelete: React.PropTypes.func.isRequired,
  onClickRestart: React.PropTypes.func.isRequired,
  onClickPlay: React.PropTypes.func.isRequired,
  onClickStop: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {id}) => ({
  onClickDelete: () => {
    dispatch(
      songs.actions.removeSong(id)
    )
    dispatch(
      url.actions.setBrowserUrl('/songs')
    )
  },
  onClickRestart: () => {
    window.loopda.audioPlayer.playSong(id, 0)
  },
  onClickPlay: () => {
    window.loopda.audioPlayer.playSong(id)
  },
  onClickStop: () => {
    window.loopda.audioPlayer.stopSong()
  },
})

export default connect(
  null,
  mapDispatchToProps
)(Controls)

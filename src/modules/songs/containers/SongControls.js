import React from 'react'
import {connect} from 'react-redux'
import {songs, blocks} from 'trax'

const SongControls = ({playing, onClickRestart, onClickToggle, onClickStop, onClickAddBlock}) => (
  <div className="song-controls">
    <button onClick={onClickRestart}>Restart</button>
    <button onClick={onClickToggle}>{playing ? 'Pause' : 'Play'}</button>
    <button onClick={onClickStop}>Stop</button>
    <button onClick={onClickAddBlock}>Add block</button>
  </div>
)

SongControls.propTypes = {
  id: React.PropTypes.string.isRequired,
  playing: React.PropTypes.bool.isRequired,
  onClickRestart: React.PropTypes.func.isRequired,
  onClickToggle: React.PropTypes.func.isRequired,
  onClickStop: React.PropTypes.func.isRequired,
  onClickAddBlock: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {id, playing}) => ({
  onClickRestart: () => {
    window.loopda.audioPlayer.restartSong()
  },
  onClickToggle: () => {
    if (playing)
      window.loopda.audioPlayer.pauseSong()
    else
      window.loopda.audioPlayer.startSong()
  },
  onClickStop: () => {
    window.loopda.audioPlayer.stopSong()
  },
  onClickAddBlock: () => {
    const action = dispatch(blocks.actions.createBlock())
    dispatch(songs.actions.addBlock(id, action.payload.id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(SongControls)

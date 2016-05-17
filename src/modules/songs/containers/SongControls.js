import React from 'react'
import {connect} from 'react-redux'

const SongControls = ({playing, onClickRestart, onClickToggle, onClickStop}) => (
  <div className="song-controls">
    <button onClick={onClickRestart}>Restart</button>
    <button onClick={onClickToggle}>{playing ? 'Pause' : 'Play'}</button>
    <button onClick={onClickStop}>Stop</button>
  </div>
)

SongControls.propTypes = {
  playing: React.PropTypes.bool.isRequired,
  onClickRestart: React.PropTypes.func.isRequired,
  onClickToggle: React.PropTypes.func.isRequired,
  onClickStop: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {playing}) => ({
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
})

export default connect(
  null,
  mapDispatchToProps
)(SongControls)

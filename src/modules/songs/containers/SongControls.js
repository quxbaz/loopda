import React from 'react'
import {connect} from 'react-redux'

const SongControls = (props) => (
  <div className="song-controls">
    <button onClick={props.onClickRestart}>Restart</button>
    {props.playing ?
      <button onClick={props.onClickPause}>Pause</button> :
      <button onClick={props.onClickPlay}>Play</button>}
    <button onClick={props.onClickStop}>Stop</button>
  </div>
)

SongControls.propTypes = {
  playing: React.PropTypes.bool.isRequired,
  onClickRestart: React.PropTypes.func.isRequired,
  onClickPlay: React.PropTypes.func.isRequired,
  onClickPause: React.PropTypes.func.isRequired,
  onClickStop: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onClickRestart: () => {
    window.loopda.audioPlayer.restartSong()
  },
  onClickPlay: () => {
    window.loopda.audioPlayer.startSong()
  },
  onClickPause: () => {
    window.loopda.audioPlayer.pauseSong()
  },
  onClickStop: () => {
    window.loopda.audioPlayer.stopSong()
  },
})

export default connect(
  null,
  mapDispatchToProps
)(SongControls)

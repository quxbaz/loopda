import React from 'react'
import {connect} from 'react-redux'
import {songPlayer} from 'trax'
import traxExt from '../../trax-ext'

const mapDispatchToProps = (dispatch, {playing}) => ({
  onClickRestart() {
    window.loopda.audioPlayer.restartSong()
  },
  onClickToggle() {
    if (playing) {
      window.loopda.audioPlayer.pauseSong()
    } else {
      window.loopda.audioPlayer.startSong()
    }
  },
  onClickStop() {
    window.loopda.audioPlayer.stopSong()
  },
  onClickStep() {
    window.loopda.audioPlayer.tickSong()
  },
  onClickLoop(event) {
    dispatch(songPlayer.actions.toggleLoop())
  },
  onChangeBeatDuration(value) {
    dispatch(songPlayer.actions.setBeatDuration(value))
    window.loopda.audioPlayer.songTimer.setTickInterval(value)
  },
})

export default connect(
  null,
  mapDispatchToProps
)(traxExt.components.PlaybackControls)

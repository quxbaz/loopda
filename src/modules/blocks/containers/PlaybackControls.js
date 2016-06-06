import React from 'react'
import {connect} from 'react-redux'
import {player} from 'trax'
import traxExt from '../../trax-ext'

const mapDispatchToProps = (dispatch) => ({
  onClickToggle() {
    dispatch(player.actions.togglePlay())
  },
  onClickStep() {
    window.loopda.audioPlayer.tick()
  },
})

export default connect(
  null,
  mapDispatchToProps
)(traxExt.components.PlaybackControls)
import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'stateful-router'
import {player} from 'trax'
import songs from '../../songs'
import KeyWatcher from './KeyWatcher'

const Overview = ({children, player, onClickPlay}) => (
  <div className="overview sequencer">
    <KeyWatcher />
    <a onClick={onClickPlay}>{player.playing ? 'Pause' : 'Play'} (space)</a>
    <Route route=":id">
      <songs.containers.Song />
    </Route>
  </div>
)

Overview.propTypes = {
  player: React.PropTypes.object.isRequired,
  onClickPlay: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  player: state.player,
})

const mapDispatchToProps = (dispatch) => ({
  onClickPlay: () => {
    dispatch(
      player.actions.togglePlay()
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)

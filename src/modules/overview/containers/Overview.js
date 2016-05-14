import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'stateful-router'
import {channels, player} from 'trax'
import songs from '../../songs'
import TempoBar from '../components/TempoBar'
import KeyWatcher from './KeyWatcher'
import AddChannel from './AddChannel'

const Overview = ({children, player, nChannels, onClickPlay}) => (
  <div className="overview sequencer">
    <KeyWatcher />
    <a onClick={onClickPlay}>{player.playing ? 'Pause' : 'Play'} (space)</a>
    <div># Channels: {nChannels}</div>
    <AddChannel />
    <div className="relative">
      <TempoBar beat={player.currentBeat} />
    </div>
    <Route route=":id">
      <songs.containers.Song />
    </Route>
  </div>
)

Overview.propTypes = {
  player: React.PropTypes.object.isRequired,
  nChannels: React.PropTypes.number.isRequired,
  onClickPlay: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  player: state.player,
  nChannels: channels.selectors.getAll(state).length,
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

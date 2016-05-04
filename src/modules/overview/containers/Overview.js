import React from 'react'
import {connect} from 'react-redux'
import {channels, player} from 'trax'
import TempoBar from '../components/TempoBar'
import KeyWatcher from './KeyWatcher'
import Pager from './Pager'
import ChannelList from './ChannelList'
import AddChannel from './AddChannel'

const TestControls = () => (
  <ul>
    <li><a onClick={() => console.clear()}>console.clear()</a></li>
    <li><a onClick={() => localStorage.clear()}>localStorage.clear()</a></li>
  </ul>
)

const Nav = () => (
  <div>
    {/*<EscapeWatcher onEscape={navSongMode} />*/}
    {/*<div><a href="/#/preset">presets</a></div>*/}
    {/*<div><a onClick={navSongMode}>song mode (esc)</a></div>*/}
  </div>
)

const Overview = ({player, nChannels, onClickPlay}) => (
  <div className="overview sequencer">
    <KeyWatcher />
    {/*<Nav />*/}
    <TestControls />
    <a onClick={onClickPlay}>{player.playing ? 'Pause' : 'Play'} (space)</a>
    <div># Channels: {nChannels}</div>
    <AddChannel />
    <Pager />
    <div className="relative">
      <TempoBar beat={player.currentBeat} />
      <ChannelList />
    </div>
  </div>
)

Overview.propTypes = {
  player: React.PropTypes.object.isRequired,
  nChannels: React.PropTypes.number.isRequired,
  onClickPlay: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  nChannels: channels.selectors.getAll(state).length
})

const mapDispatchToProps = (dispatch) => ({
  onClickPlay: () => {
    dispatch(
      player.actions.togglePlay()
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)

import React from 'react'
import {connect} from 'react-redux'
import {sequencer} from 'trax'
import KeyWatcher from '../containers/KeyWatcher'
import ChannelList from '../containers/ChannelList'
import AddChannel from '../containers/AddChannel'

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

const Overview = ({sequencer, onClickPlay}) => (
  <div className="overview sequencer">
    <KeyWatcher />
    {/*<Nav />*/}
    <TestControls />
    <a onClick={onClickPlay}>{sequencer.playing ? 'Pause' : 'Play'} (space)</a>
    <div># Channels: {sequencer.channels.length}</div>
    <AddChannel />
    <ChannelList />
  </div>
)

Overview.propTypes = {
  sequencer: React.PropTypes.object
}

const mapDispatchToProps = (dispatch) => ({
  onClickPlay: () => {
    dispatch(
      sequencer.actions.togglePlay()
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Overview)

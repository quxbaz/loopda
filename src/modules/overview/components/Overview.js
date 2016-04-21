import React from 'react'
import ChannelList from '../containers/ChannelList'
import AddChannel from '../containers/AddChannel'

const Overview = ({sequencer}) => {

  // temp vars
  const playing = false
  //


  const {channels} = sequencer

  return (
    <div className="overview sequencer">
      {/*<EscapeWatcher onEscape={navSongMode} />*/}
      {/*<div><a href="/#/preset">presets</a></div>*/}
      {/*<div><a onClick={navSongMode}>song mode (esc)</a></div>*/}
      <ul>
        <li><a onClick={() => console.clear()}>console.clear()</a></li>
        <li><a onClick={() => localStorage.clear()}>localStorage.clear()</a></li>
      </ul>
      {/*<a className="togglePlay" onClick={togglePlay}>
        {playing ? 'pause' : 'play'} (space)
      </a>*/}
      <div># Channels: {channels.length}</div>
      <AddChannel />
      {/*<ChannelMenu presets={presets} onSelect={addChannel} />*/}
      <ChannelList />
    </div>
  )

}

Overview.propTypes = {
  sequencer: React.PropTypes.object
}

export default Overview

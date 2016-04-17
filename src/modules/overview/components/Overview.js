import React from 'react'
import ChannelList from './ChannelList'

const Overview = ({sequencer}) => {

  // temp vars
  const playing = false
  //

  const {channels} = sequencer

  return (
    <div className="overview">
      {/*<EscapeWatcher onEscape={navSongMode} />*/}
      <div><a href="/#/preset">presets</a></div>
      {/*<div><a onClick={navSongMode}>song mode (esc)</a></div>*/}
      <div>
        <a onClick={() => localStorage.clear()}>localStorage.clear()</a>
      </div>
      {/*<a className="togglePlay" onClick={togglePlay}>
        {playing ? 'pause' : 'play'} (space)
      </a>*/}
      <div>
        # Channels: {channels.length}
      </div>
      {/*<ChannelMenu presets={presets} onSelect={addChannel} />*/}
      <ChannelList channels={channels} />
    </div>
  )

}

Overview.propTypes = {
  sequencer: React.PropTypes.object
}

export default Overview

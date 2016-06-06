import React from 'react'
import ux from '../../ux'

const PlaybackControls = (props) => (
  <div className="playback-controls">
    <ux.KeyWatcher onKeySpace={props.onClickToggle} />
    <button className="restart" onClick={props.onClickRestart}>Restart</button>
    <button className="toggle" onClick={props.onClickToggle}>{props.playing ? 'Pause' : 'Play'}</button>
    <button className="stop" onClick={props.onClickStop}>Stop</button>
  </div>
)

PlaybackControls.propTypes = {
  playing: React.PropTypes.bool.isRequired,
  onClickRestart: React.PropTypes.func,
  onClickToggle: React.PropTypes.func,
  onClickStop: React.PropTypes.func,
}

export default PlaybackControls

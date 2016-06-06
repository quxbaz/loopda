import React from 'react'
import ux from '../../ux'

const PlaybackControls = (props) => (
  <div className="playback-controls">
    <ux.KeyWatcher onKeySpace={props.onClickToggle} />
    <button onClick={props.onClickRestart}>Restart</button>
    <button onClick={props.onClickToggle}>{props.playing ? 'Pause' : 'Play'}</button>
    <button onClick={props.onClickStop}>Stop</button>
  </div>
)

PlaybackControls.propTypes = {
  playing: React.PropTypes.bool.isRequired,
  onClickRestart: React.PropTypes.func,
  onClickToggle: React.PropTypes.func,
  onClickStop: React.PropTypes.func,
}

export default PlaybackControls

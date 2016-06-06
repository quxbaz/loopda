import React from 'react'
import ux from '../../ux'

const PlaybackControls = (props) => (
  <div className="playback-controls">
    <ux.KeyWatcher onKeySpace={props.onClickToggle} onKeyRightArrow={props.onClickStep} />
    <button className="restart" onClick={props.onClickRestart}>Restart</button>
    <button className="toggle" onClick={props.onClickToggle}>{props.playing ? 'Pause' : 'Play'}</button>
    <button className="stop" onClick={props.onClickStop}>Stop</button>
    <button className="step" onClick={props.onClickStep}>Step</button>
    <label className="loop">
      <input type="checkbox" checked={props.loop} onChange={props.onClickLoop} />
      Loop
    </label>
  </div>
)

PlaybackControls.propTypes = {
  playing: React.PropTypes.bool.isRequired,
  loop: React.PropTypes.bool,
  onClickRestart: React.PropTypes.func,
  onClickToggle: React.PropTypes.func,
  onClickStop: React.PropTypes.func,
  onClickStep: React.PropTypes.func,
  onClickLoop: React.PropTypes.func,
}

PlaybackControls.defaultProps = {
  loop: false,
}

export default PlaybackControls

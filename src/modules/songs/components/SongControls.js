import React from 'react'

const SongControls = (props) => (
  <div className="song-controls">
    <button onClick={props.onClickRestart}>Restart</button>
    {props.playing ?
      <button onClick={props.onClickPause}>Pause</button> :
      <button onClick={props.onClickPlay}>Play</button>}
    <button onClick={props.onClickStop}>Stop</button>
  </div>
)

SongControls.propTypes = {
  playing: React.PropTypes.bool.isRequired,
  onClickRestart: React.PropTypes.func.isRequired,
  onClickPlay: React.PropTypes.func.isRequired,
  onClickPause: React.PropTypes.func.isRequired,
  onClickStop: React.PropTypes.func.isRequired,
}

export default SongControls

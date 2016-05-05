import React from 'react'

const Playback = ({onClickRestart, onClickPlay, onClickStop}) => (
  <div className="editor-playback">
    <button onClick={onClickRestart}>Play from beginning</button>{' '}
    <button onClick={onClickPlay}>Play</button>{' '}
    <button onClick={onClickStop}>Stop</button>
  </div>
)

Playback.propTypes = {
  onClickRestart: React.PropTypes.func.isRequired,
  onClickPlay: React.PropTypes.func.isRequired,
  onClickStop: React.PropTypes.func.isRequired,
}

export default Playback

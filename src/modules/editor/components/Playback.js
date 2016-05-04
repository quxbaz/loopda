import React from 'react'

const Playback = ({onClickPlay, onClickStop}) => (
  <div className="editor-playback">
    <button onClick={onClickPlay}>Play</button>{' '}
    <button onClick={onClickStop}>Stop</button>
  </div>
)

Playback.propTypes = {
  onClickPlay: React.PropTypes.func.isRequired,
  onClickStop: React.PropTypes.func.isRequired,
}

export default Playback

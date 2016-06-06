import React from 'react'
import ux from '../../ux'
import ui from '../../ui'

class PlaybackControls extends React.Component {

  constructor(props) {
    super(props)
    this.handleChangeBeatDuration = this.handleChangeBeatDuration.bind(this)
  }

  handleChangeBeatDuration(event) {
    this.props.onChangeBeatDuration(parseInt(event.target.value))
  }

  render() {
    const {props} = this
    return (
      <div className="playback-controls">
        <ux.KeyWatcher onKeySpace={props.onClickToggle} onKeyRightArrow={props.onClickStep} />
        <button className="restart" onClick={props.onClickRestart}>Restart</button>
        <button className="toggle" onClick={props.onClickToggle}>{props.playing ? 'Pause' : 'Play'}</button>
        <button className="stop" onClick={props.onClickStop}>Stop</button>
        <button className="rewind" onClick={props.onClickRewind}>Rewind</button>
        <button className="step" onClick={props.onClickStep}>Step</button>
        <label className="loop">
          <input type="checkbox" checked={props.loop} onChange={props.onClickLoop} />
          Loop
        </label>
        <label>
          <input type="range" value={props.beatDuration} min={20} max={500} onChange={this.handleChangeBeatDuration} />
          beat = {props.beatDuration}ms
        </label>
      </div>
    )
  }

}

PlaybackControls.propTypes = {
  playing: React.PropTypes.bool.isRequired,
  beatDuration: React.PropTypes.number.isRequired,
  loop: React.PropTypes.bool,
  onClickRestart: React.PropTypes.func,
  onClickToggle: React.PropTypes.func,
  onClickStop: React.PropTypes.func,
  onClickStep: React.PropTypes.func,
  onClickRewind: React.PropTypes.func,
  onClickLoop: React.PropTypes.func,
  onChangeBeatDuration: React.PropTypes.func,
}

PlaybackControls.defaultProps = {
  loop: false,
}

export default PlaybackControls

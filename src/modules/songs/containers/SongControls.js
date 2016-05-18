import React from 'react'
import {connect} from 'react-redux'
import {songs, blocks, songPlayer} from 'trax'
import ux from '../../ux'

const SongControls = ({playing, loop, onClickRestart, onClickToggle, onClickStop, onClickAddBlock, onClickLoop}) => (
  <div className="song-controls">
    <ux.KeyWatcher onKeySpace={onClickToggle} />
    <button onClick={onClickRestart}>Restart</button>
    <button onClick={onClickToggle}>{playing ? 'Pause' : 'Play'}</button>
    <button onClick={onClickStop}>Stop</button>
    <button onClick={onClickAddBlock}>Add block</button>{' '}
    <label><input type="checkbox" checked={loop} onChange={onClickLoop} /> Loop</label>
  </div>
)

SongControls.propTypes = {
  id: React.PropTypes.string.isRequired,
  playing: React.PropTypes.bool.isRequired,
  loop: React.PropTypes.bool.isRequired,
  onClickRestart: React.PropTypes.func.isRequired,
  onClickToggle: React.PropTypes.func.isRequired,
  onClickStop: React.PropTypes.func.isRequired,
  onClickAddBlock: React.PropTypes.func.isRequired,
  onClickLoop: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {id, playing}) => ({
  onClickRestart: () => {
    window.loopda.audioPlayer.restartSong()
  },
  onClickToggle: () => {
    if (playing)
      window.loopda.audioPlayer.pauseSong()
    else
      window.loopda.audioPlayer.startSong()
  },
  onClickStop: () => {
    window.loopda.audioPlayer.stopSong()
  },
  onClickAddBlock: () => {
    const action = dispatch(blocks.actions.createBlock())
    dispatch(songs.actions.addBlock(id, action.payload.id))
  },
  onClickLoop: (event) => {
    dispatch(songPlayer.actions.toggleLoop())
    event.target.blur()
  },
})

export default connect(
  null,
  mapDispatchToProps
)(SongControls)

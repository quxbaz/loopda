import React from 'react'
import {connect} from 'react-redux'
import {songs, songPlayer} from 'trax'
import SongControls from './SongControls'
import SongOverview from './SongOverview'

class Song extends React.Component {

  componentWillMount() {
    this.props.onMount()
  }

  componentWillUnmount() {
    this.props.onUnmount()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id)
      this.props.onSwitchSong(nextProps.id)
  }

  render() {
    const {id, song, playing, loop, currentBeat} = this.props
    return (
      <div className="song">
        <h2>{song.title}</h2>
        <SongControls id={id} playing={playing} loop={loop} />
        <SongOverview id={id} currentBeat={currentBeat} />
      </div>
    )
  }

}

Song.propTypes = {
  id: React.PropTypes.string.isRequired,
  song: React.PropTypes.object.isRequired,
  playing: React.PropTypes.bool.isRequired,
  loop: React.PropTypes.bool.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  onMount: React.PropTypes.func.isRequired,
  onUnmount: React.PropTypes.func.isRequired,
  onSwitchSong: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  song: songs.selectors.getById(id)(state),
  playing: state.songPlayer.playing,
  loop: state.songPlayer.loop,
  currentBeat: state.songPlayer.currentBeat,
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onMount: () => {
    dispatch(songPlayer.actions.setCurrentSong(id))
  },
  onUnmount: () => {
    dispatch(songPlayer.actions.stop())
    dispatch(songPlayer.actions.clearCurrentSong())
  },
  onSwitchSong: (id) => {
    dispatch(songPlayer.actions.setCurrentSong(id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Song)

import React from 'react'
import {connect} from 'react-redux'
import {songs, songPlayer} from 'trax'
import BlockGrid from '../providers/BlockGrid'
import PlaybackControls from '../providers/PlaybackControls'

class Song extends React.Component {

  componentWillMount() {
    this.props.onMount()
  }

  componentWillUnmount() {
    this.props.onUnmount()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.onSwitchSong(nextProps.id)
    }
  }

  render() {
    const {title, blocks} = this.props.song
    return (
      <div className="song">
        <h2>{title}</h2>
        <BlockGrid ids={blocks} />
        <div className="sticky-panel-bottom">
          <PlaybackControls />
        </div>
      </div>
    )
  }

}

Song.propTypes = {
  song: React.PropTypes.object.isRequired,
  onMount: React.PropTypes.func.isRequired,
  onUnmount: React.PropTypes.func.isRequired,
  onSwitchSong: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {song}) => ({
  onMount() {
    dispatch(songPlayer.actions.setCurrentSong(song.id))
  },
  onUnmount() {
    dispatch(songPlayer.actions.stop())
    dispatch(songPlayer.actions.clearCurrentSong())
  },
  onSwitchSong(id) {
    dispatch(songPlayer.actions.setCurrentSong(id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(Song)

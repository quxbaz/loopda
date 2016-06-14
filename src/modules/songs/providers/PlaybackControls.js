import {connect} from 'react-redux'
import PlaybackControls from '../containers/PlaybackControls'

const mapStateToProps = (state) => ({
  playing: state.songPlayer.playing,
  loop: state.songPlayer.loop,
  beatDuration: state.songPlayer.beatDuration,
})

export default connect(mapStateToProps)(PlaybackControls)

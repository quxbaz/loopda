import {connect} from 'react-redux'
import PlaybackControls from '../containers/PlaybackControls'

const mapStateToProps = (state) => ({
  playing: state.player.playing,
  beatDuration: state.player.beatDuration,
})

export default connect(mapStateToProps)(PlaybackControls)

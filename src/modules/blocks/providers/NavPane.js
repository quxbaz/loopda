import {connect} from 'react-redux'
import {songs} from 'trax'
import navPane from '../../nav-pane'

const mapStateToProps = (state, {songId}) => ({
  ids: songs.selectors.getById(songId)(state).blocks,
})

export default connect(mapStateToProps)(navPane.containers.NavPane)

import {connect} from 'react-redux'
import {songs, blocks} from 'trax'
import BlockControls from '../containers/BlockControls'

const mapStateToProps = (state, {block}) => ({
  song: songs.selectors.getById(block.song)(state),
})

export default connect(mapStateToProps)(BlockControls)

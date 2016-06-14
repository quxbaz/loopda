import {connect} from 'react-redux'
import {songs} from 'trax'
import Song from '../containers/Song'

const mapStateToProps = (state, {id}) => ({
  song: songs.selectors.getById(id)(state),
})

export default connect(mapStateToProps)(Song)

import {connect} from 'react-redux'
import {songs} from 'trax'
import SongItem from '../containers/SongItem'

const makeMapStateToProps = (initialState, {id}) => (state) => ({
  song: songs.selectors.getById(id)(state),
})

export default connect(makeMapStateToProps)(SongItem)

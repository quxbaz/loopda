import {connect} from 'react-redux'
import SongList from '../components/SongList'

const mapStateToProps = (state) => ({
  ids: Object.keys(state.songs),
})

export default connect(mapStateToProps)(SongList)

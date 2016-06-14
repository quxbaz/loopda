import {connect} from 'react-redux'
import BlockGrid from '../components/BlockGrid'

const mapStateToProps = (state) => ({
  currentBeat: state.songPlayer.currentBeat,
})

export default connect(mapStateToProps)(BlockGrid)

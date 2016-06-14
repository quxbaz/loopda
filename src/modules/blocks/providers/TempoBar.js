import {connect} from 'react-redux'
import traxExt from '../../trax-ext'

const mapStateToProps = (state) => ({
  beat: state.player.currentBeat,
})

export default connect(
  mapStateToProps
)(traxExt.components.TempoBar)

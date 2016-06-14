import {connect} from 'react-redux'
import PresetList from '../components/PresetList'

const mapStateToProps = (state, {id}) => ({
  id,  // The currently selected preset
  ids: Object.keys(state.presets),
})

export default connect(mapStateToProps)(PresetList)

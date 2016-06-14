import {connect} from 'react-redux'
import {presets} from 'trax'
import PresetItem from '../containers/PresetItem'

const mapStateToProps = (state, {id}) => ({
  preset: presets.selectors.getById(id)(state),
})

export default connect(mapStateToProps)(PresetItem)

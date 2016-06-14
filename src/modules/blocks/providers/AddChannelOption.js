import {connect} from 'react-redux'
import {presets} from 'trax'
import AddChannelOption from '../containers/AddChannelOption'

const mapStateToProps = (state, {id}) => ({
  preset: presets.selectors.getById(id)(state),
})

export default connect(mapStateToProps)(AddChannelOption)

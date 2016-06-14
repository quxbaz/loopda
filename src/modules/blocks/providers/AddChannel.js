import {connect} from 'react-redux'
import AddChannel from '../components/AddChannel'

const mapStateToProps = (state) => ({
  ids: Object.keys(state.presets),
})

export default connect(mapStateToProps)(AddChannel)

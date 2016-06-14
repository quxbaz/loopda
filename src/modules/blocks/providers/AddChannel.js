import {connect} from 'react-redux'
import AddChannel from '../components/AddChannel'

const mapStateToProps = (state) => ({
  /*
    <NOTE:Optimization> Normally we'd only pass in the keys here with
    Object.keys(state.presets) instead of the entire state
    object. Object.keys(...), however, creates a *new* array that
    causes unnecessary rendering.
  */
  presets: state.presets,
})

export default connect(mapStateToProps)(AddChannel)

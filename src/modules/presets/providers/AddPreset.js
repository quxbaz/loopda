import {connect} from 'react-redux'
import audio from '../../audio'
import AddPreset from '../containers/AddPreset'

const mapStateToProps = (state) => ({
  samples: audio.selectors.getSamples(state),
})

export default connect(mapStateToProps)(AddPreset)

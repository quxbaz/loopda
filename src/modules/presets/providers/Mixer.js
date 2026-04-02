import {connect} from 'react-redux'
import {presets, mixables} from 'trax'
import Mixer from '../containers/Mixer'

const mapStateToProps = (state, {id}) => {
  const preset = presets.selectors.getById(id)(state)
  return {
    mixable: mixables.selectors.getById(preset.mixable)(state),
    isDefault: preset.title && preset.title.startsWith('default '),
  }
}

export default connect(mapStateToProps)(Mixer)

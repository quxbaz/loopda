import {connect} from 'react-redux'
import {presets, mixables} from 'trax'
import Mixer from '../containers/Mixer'

const mapStateToProps = (state, {id}) => {
  const {mixable} = presets.selectors.getById(id)(state)
  return {
    mixable: mixables.selectors.getById(mixable)(state),
  }
}

export default connect(mapStateToProps)(Mixer)

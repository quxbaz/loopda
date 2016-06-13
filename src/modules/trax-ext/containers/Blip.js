import {connect} from 'react-redux'
import {blips} from 'trax'
import Blip from '../components/Blip'

const makeMapStateToProps = (initialState, {id}) => (state) => ({
  blip: blips.selectors.getById(id)(state),
})

export default connect(makeMapStateToProps)(Blip)

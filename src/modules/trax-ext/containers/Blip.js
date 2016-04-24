import {connect} from 'react-redux'
import {blips} from 'trax'
import Blip from '../components/Blip'

const mapStateToProps = (state, {id}) => ({
  blip: blips.selectors.getById(id)(state)
})

export default connect(
  mapStateToProps
)(Blip)

import {connect} from 'react-redux'
import {blips} from 'trax'
import Blip from '../components/Blip'

const mapStateToProps = (state, {id}) => ({
  blip: blips.selectors.getById(id)(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClick: (id) => {
    dispatch(blips.actions.toggleMuteBlip(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blip)

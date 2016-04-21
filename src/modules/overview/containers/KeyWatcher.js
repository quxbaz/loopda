import {connect} from 'react-redux'
import {sequencer} from 'trax'
import ux from '../../ux'

const mapDispatchToProps = (dispatch) => ({
  onKeySpace: () => {
    dispatch(sequencer.actions.togglePlay())
  },
  onKeyEscape: () => {
    /*
      <TEST>
    */
    console.clear()
  }
})

export default connect(
  null,
  mapDispatchToProps
)(ux.KeyWatcher)

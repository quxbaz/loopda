import {connect} from 'react-redux'
import {player} from 'trax'
import ux from '../../ux'

const mapDispatchToProps = (dispatch) => ({
  onKeySpace: (event) => {
    event.preventDefault()
    dispatch(player.actions.togglePlay())
  },
  onKeyEscape: () => {
    /*
      <TEST>
    */
    // console.clear()
  }
})

export default connect(
  null,
  mapDispatchToProps
)(ux.KeyWatcher)

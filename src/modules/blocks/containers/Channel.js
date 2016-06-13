import {connect} from 'react-redux'
import {channels} from 'trax'
import traxExt from '../../trax-ext'
import util from '../util'

const mapDispatchToProps = (dispatch, {channel}) => ({

  onMouseDown(event, el) {
    const beat = util.getBeatClicked(event, el)
    dispatch(channels.actions.toggleBlipAt(channel.id, beat))
    return dispatch((dispatch, getState) => {
      return channels.selectors.getBlipAt(channel.id, beat)(getState()).mute
    })
  },

  onMouseMove(event, el, blipWasMuted) {
    const beat = util.getBeatClicked(event, el)
    if (blipWasMuted) {
      dispatch(channels.actions.muteBlipAt(channel.id, beat))
    } else {
      dispatch(channels.actions.unmuteBlipAt(channel.id, beat))
    }
  },

})

export default connect(
  null,
  mapDispatchToProps
)(traxExt.components.Channel)

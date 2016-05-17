import {connect} from 'react-redux'
import Channel from '../components/Channel'
import {channels} from 'trax'
import util from '../util'

const mapStateToProps = (state, {id}) => ({
  channel: channels.selectors.getById(id)(state),
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onMouseDown: (event, el) => {
    const beat = util.getBeatClicked(event, el)
    dispatch(channels.actions.toggleBlipAt(id, beat))
    return dispatch((dispatch, getState) => {
      return channels.selectors.getBlipAt(id, beat)(getState()).mute
    })
  },
  onMouseMove: (event, el, blipWasMuted) => {
    const beat = util.getBeatClicked(event, el)
    if (blipWasMuted) {
      dispatch(channels.actions.muteBlipAt(id, beat))
    } else {
      dispatch(channels.actions.unmuteBlipAt(id, beat))
    }
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel)

import {connect} from 'react-redux'
import Channel from '../components/Channel'
import {channels} from 'trax'

const BEATS = 16

const getBeatClicked = (event, el) => {
  /*
    Detects which beat position was clicked by looking at the position
    of the mouse click compared to the dimensions of the channel
    element. This exists as an optimization that bypasses the need to
    render individual click-watching blip elements.
  */
  const {left, right} = el.getBoundingClientRect()
  const channelWidth = right - left
  const blipWidth = channelWidth / BEATS
  return Math.floor((event.clientX - left) / blipWidth)
}

const mapStateToProps = (state, {id}) => ({
  channel: channels.selectors.getById(id)(state),
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onMouseDown: (event, el) => {
    const beat = getBeatClicked(event, el)
    dispatch(channels.actions.toggleBlipAt(id, beat))
    return dispatch((dispatch, getState) => {
      return channels.selectors.getBlipAt(id, beat)(getState()).mute
    })
  },
  onMouseMove: (event, el, blipWasMuted) => {
    const beat = getBeatClicked(event, el)
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

import {connect} from 'react-redux'
import Channel from '../components/Channel'
import {channels} from 'trax'

const mapStateToProps = (state, {id}) => ({
  channel: channels.selectors.getById(id)(state),
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onMouseDown: (event, el) => {
    /*
      Detects which beat position was clicked by looking at the
      position of the mouse click compared to the dimensions of the
      channel element. This exists as an optimization that avoids
      rendering individual click-watching elements instead.
    */
    const {left, right} = el.getBoundingClientRect()
    const channelWidth = right - left
    const beats = 16
    const blipWidth = channelWidth / beats
    const beatClicked = Math.floor((event.clientX - left) / blipWidth)
    dispatch(
      channels.actions.toggleBlipAt(id, beatClicked)
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel)

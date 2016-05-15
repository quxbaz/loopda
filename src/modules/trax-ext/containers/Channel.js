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
    const beatClicked = getBeatClicked(event, el)
    dispatch(
      channels.actions.toggleBlipAt(id, beatClicked)
    )
  },
  onMouseMove: (event, el, toggleSwitch) => {

    console.log('move')

    // let blip
    // dispatch((dispatch, getState) => {
    //   blip = channels.selectors.getBlipAt(id, beatClicked)(getState())
    // })

    // // fireOnce(window, 'mouseup', removeeventlistener)

    // if (toggleSwitch)
    //   dispatch(channels.actions.enableBlipAt(id, beatClicked))
    // else
    //   dispatch(channels.actions.disableBlipAt(id, beatClicked))

  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel)

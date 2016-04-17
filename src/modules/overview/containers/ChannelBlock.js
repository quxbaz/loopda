import {connect} from 'react-redux'
import ChannelBlock from '../components/ChannelBlock'

const mapStateToProps = (state, props) => {
  return state.sequencer.channels.find(
    channel => channel.id === props.id
  )
}

const mapDispatchToProps = (state, props) => {
  return {
    onClickMute: (id) => {},
    onClickArchive: (id) => {}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelBlock)

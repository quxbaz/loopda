import {connect} from 'react-redux'
import {channels} from 'trax'
import ChannelList from '../components/ChannelList'

// <TODO> Implement reselect here
const mapStateToProps = (state, {ids}) => {
  const channelResults = channels.selectors.getMany(ids)(state)
  return {
    channels: channelResults,
    isSoloMode: channelResults.some(c => c.solo),
  }
}

export default connect(
  mapStateToProps
)(ChannelList)

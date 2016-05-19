import {connect} from 'react-redux'
import {channels} from 'trax'
import ChannelList from '../components/ChannelList'

const mapStateToProps = (state, {ids}) => {
  const results = channels.selectors.getMany(ids)(state)
  return {
    channels: results,
    isSoloMode: results.some(c => c.solo),
  }
}

export default connect(
  mapStateToProps
)(ChannelList)

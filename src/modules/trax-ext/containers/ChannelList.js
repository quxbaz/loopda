import {connect} from 'react-redux'
import {channels} from 'trax'
import ChannelList from '../components/ChannelList'

const mapStateToProps = (state, {ids}) => {
  const query = channels.selectors.getMany(ids)(state)
  return {
    ids,
    isSoloMode: query.some(c => c.solo),
  }
}

export default connect(
  mapStateToProps
)(ChannelList)

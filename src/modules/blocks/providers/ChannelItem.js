import {connect} from 'react-redux'
import {channels} from 'trax'
import ChannelItem from '../components/ChannelItem'

const makeMapStateToProps = (initialState, {id}) => (state) => ({
  channel: channels.selectors.getById(id)(state),
})

export default connect(makeMapStateToProps)(ChannelItem)

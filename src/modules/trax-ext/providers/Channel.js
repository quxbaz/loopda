import {connect} from 'react-redux'
import {channels} from 'trax'
import Channel from '../components/Channel'

const makeMapStateToProps = (initialState, {id}) => (state) => ({
  channel: channels.selectors.getById(id)(state),
})

export default connect(makeMapStateToProps)(Channel)

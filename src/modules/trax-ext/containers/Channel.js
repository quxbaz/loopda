import {connect} from 'react-redux'
import {channels} from 'trax'
import Channel from '../components/Channel'

const mapStateToProps = (state, {id}) => ({
  channel: channels.selectors.getById(id)(state),
})

export default connect(
  mapStateToProps
)(Channel)

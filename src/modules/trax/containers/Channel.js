import Channel from '../components/Channel'
import {connect} from 'react-redux'
import {blips} from 'trax'

const mapStateToProps = (state, {channel}) => ({
  blips: blips.selectors.getSome(channel.blips)(state)
})

export default connect(
  mapStateToProps
)(Channel)

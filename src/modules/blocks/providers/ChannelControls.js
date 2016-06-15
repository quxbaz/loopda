import {connect} from 'react-redux'
import {presets} from 'trax'
import ChannelControls from '../containers/ChannelControls'

const makeMapStateToProps = (initialState, {channel}) => (state) => ({
  presetTitle: presets.selectors.getById(channel.preset)(state).title,
})

export default connect(makeMapStateToProps)(ChannelControls)

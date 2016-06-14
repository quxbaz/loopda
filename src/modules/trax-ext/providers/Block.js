import {connect} from 'react-redux'
import {blocks} from 'trax'
import Block from '../components/Block'

const makeMapStateToProps = (initialState, {id}) => (state) => ({
  block: blocks.selectors.getById(id)(state),
  isSoloMode: blocks.selectors.isSoloMode(id)(state),
})

export default connect(makeMapStateToProps)(Block)

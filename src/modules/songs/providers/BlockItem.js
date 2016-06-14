import {connect} from 'react-redux'
import {blocks} from 'trax'
import BlockItem from '../containers/BlockItem'

const mapStateToProps = (state, {id}) => ({
  block: blocks.selectors.getById(id)(state),
})

export default connect(mapStateToProps)(BlockItem)

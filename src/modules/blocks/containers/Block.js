import React from 'react'
import {connect} from 'react-redux'
import {blockAdmin} from 'trax'
import ChannelList from './ChannelList'

const Block = ({block}) => (
  <div className="block">
    <ChannelList ids={block.channels} />
  </div>
)

Block.propTypes = {
  block: React.PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  block: blockAdmin.selectors.getCurrentBlock(state),
})

export default connect(
  mapStateToProps
)(Block)

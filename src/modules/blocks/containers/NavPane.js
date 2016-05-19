import React from 'react'
import {connect} from 'react-redux'
import {blocks} from 'trax'
import traxExt from '../../trax-ext'

class NavPane extends React.Component {

  render() {
    const {blocks} = this.props
    return (
      <div className="block-nav-pane">
        <traxExt.components.BlockList blocks={blocks} />
      </div>
    )
  }

}

NavPane.propTypes = {
  ids: React.PropTypes.array.isRequired,
  blocks: React.PropTypes.array.isRequired,
}

const mapStateToProps = (state, {ids}) => ({
  blocks: ids.map(
    (id) => blocks.selectors.getById(id)(state)
  ),
})

export default connect(
  mapStateToProps
)(NavPane)

import React from 'react'
import {connect} from 'react-redux'
import {blocks} from 'trax'
import traxExt from '../../trax-ext'
import url from '../../url'

class NavPane extends React.Component {

  render() {
    const {blocks, onClickBlock} = this.props
    return (
      <div className="block-nav-pane">
        <traxExt.components.BlockList blocks={blocks} onClickBlock={onClickBlock} />
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

const mapDispatchToProps = (dispatch) => ({
  onClickBlock: (id) => {
    dispatch(url.actions.setBrowserUrl('/blocks/' + id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavPane)

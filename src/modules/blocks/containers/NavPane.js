import React from 'react'
import {connect} from 'react-redux'
import {fireOnce} from 'dom-util'
import {blocks} from 'trax'
import traxExt from '../../trax-ext'
import url from '../../url'

class NavPane extends React.Component {

  constructor(props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = {
      isMouseDown: false,
      isDragging: false,
      originX: undefined,
      scrollX: undefined,
    }
  }

  componentWillUnmount() {
    window.removeEventListener(window, 'mouseup', this.onMouseUp)
  }

  handleMouseDown(event) {
    this.setState({
      isMouseDown: true,
      isDragging: false,
      originX: event.clientX,
      scrollX: this.refs.el.scrollLeft,
    })
    this.onMouseUp = fireOnce(window, 'mouseup', (event) => {
      this.setState({isMouseDown: false})
    })
  }

  handleMouseMove(event) {
    if (this.state.isMouseDown) {
      const diff = this.state.originX - event.clientX
      if (Math.abs(diff) > 20)
        this.setState({isDragging: true})
      this.refs.el.scrollLeft = this.state.scrollX + diff
    }
  }

  render() {
    const {selected, blocks, onClickBlock} = this.props
    return (
      <div ref="el" className="block-nav-pane" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove}>
        <traxExt.components.BlockList selected={selected} blocks={blocks}
          onClickBlock={this.state.isDragging ? undefined : onClickBlock} />
      </div>
    )
  }

}

NavPane.propTypes = {
  ids: React.PropTypes.array.isRequired,
  selected: React.PropTypes.string,
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

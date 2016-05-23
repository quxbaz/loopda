import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {fireOnce} from 'dom-util'
import {blocks} from 'trax'
import traxExt from '../../trax-ext'
import url from '../../url'
import Block from '../components/Block'

class NavPane extends React.Component {

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = {
      hidden: false,
      isMouseDown: false,
      isDragging: false,
      originX: undefined,
      scrollX: undefined,
    }
  }

  componentWillUnmount() {
    window.removeEventListener(window, 'mouseup', this.onMouseUp)
  }

  toggle() {
    this.setState({hidden: !this.state.hidden})
  }

  handleMouseDown(event) {
    event.preventDefault()  // Prevents scroll from resetting on moving the mouse outside the window
    this.setState({
      isMouseDown: true,
      isDragging: false,
      originX: event.clientX,
      scrollX: this.refs.el.scrollLeft,
    })
    window.addEventListener('mousemove', this.handleMouseMove)
    this.onMouseUp = fireOnce(window, 'mouseup', (event) => {
      window.removeEventListener('mousemove', this.handleMouseMove)
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
    const {hidden} = this.state
    const {selected, blocks, onClickBlock} = this.props
    const cssClass = classNames({
      'block-nav-pane': true,
      'minimized': hidden,
    })
    return (
      <div className={cssClass}>
        <div className="toggle-bar" onClick={this.toggle}>
          {hidden ? 'Show previewer' : 'Hide previewer'}
        </div>
        <div ref="el" className="block-nav-scroll-pane" onMouseDown={this.handleMouseDown}>
          {hidden ? null :
            <traxExt.components.BlockList Child={Block} selected={selected} blocks={blocks}
              onClickBlock={this.state.isDragging ? undefined : onClickBlock} />}
        </div>
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

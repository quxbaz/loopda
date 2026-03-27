import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {fireOnce} from 'dom-util'
import traxExt from '../../trax-ext'
import url from '../../url'
import Block from '../components/Block'

class NavPane extends Component {

  constructor(props) {
    super(props)
    this.elRef = React.createRef()
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
    if (this.onMouseUp)
      window.removeEventListener('mouseup', this.onMouseUp)
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
      scrollX: this.elRef.current.scrollLeft,
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
      this.elRef.current.scrollLeft = this.state.scrollX + diff
    }
  }

  render() {
    const {hidden} = this.state
    const {ids, selected, onClickBlock} = this.props
    const cssClass = classNames({
      'block-nav-pane': true,
      'minimized': hidden,
    })
    return (
      <div className={cssClass}>
        <div className="toggle-bar" onClick={this.toggle}>
          {hidden ? 'Show previewer' : 'Hide previewer'}
        </div>
        <div ref={this.elRef} className="block-nav-scroll-pane" onMouseDown={this.handleMouseDown}>
          <traxExt.components.BlockList Child={Block} ids={ids} selected={selected}
            onClickBlock={this.state.isDragging ? undefined : onClickBlock} />
        </div>
      </div>
    )
  }

}

NavPane.propTypes = {
  ids: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onClickBlock(id) {
    dispatch(url.actions.setBrowserUrl('/blocks/' + id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(NavPane)

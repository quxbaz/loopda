import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {songs, songPlayer} from 'trax'
import {PureComponent} from 'loopda/lib/react-ext'
import traxExt from '../../trax-ext'
import url from '../../url'
import Timeline from './Timeline'

class BlockItem extends PureComponent {

  constructor(props) {
    super(props)
    this.handleClickBody = this.handleClickBody.bind(this)
    this.handleTimelineMouseMove = this.handleTimelineMouseMove.bind(this)
    this.handleTimelineMouseOut = this.handleTimelineMouseOut.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.state = {
      dragging: false,
      timelinePreviewN: -1,
      showTimelinePreview: false,
    }
  }

  handleClickBody() {
    this.props.onClickBody(this.props.block.id)
  }

  handleTimelineMouseMove(i) {
    this.setState({
      timelinePreviewN: i,
      showTimelinePreview: true,
    })
  }

  handleTimelineMouseOut() {
    this.setState({
      showTimelinePreview: false,
    })
  }

  handleDragStart(event) {
    this.setState({dragging: true})
    this.props.onDragStart(this.props.i)
  }

  handleDragEnd(event) {
    this.setState({dragging: false})
  }

  handleDragOver(event) {
    event.preventDefault()
  }

  handleDrop(event) {
    event.preventDefault()
    this.props.onDrop(this.props.i)
  }

  render() {
    const {timelinePreviewN, showTimelinePreview} = this.state
    const {block, i, isSoloMode, beatOffset} = this.props
    const dragProps = {
      draggable: true,
      onDragStart: this.handleDragStart,
      onDragEnd: this.handleDragEnd,
      onDragOver: this.handleDragOver,
      onDrop: this.handleDrop,
    }
    const innerCssClass = classNames({
      relative: true,
      dragging: this.state.dragging,
    })
    return (
      <div className="block-item">
        <Timeline i={i} onMouseMove={this.handleTimelineMouseMove} onMouseOut={this.handleTimelineMouseOut} />
        <div ref="channels" className={innerCssClass} {...dragProps} onClick={this.handleClickBody}>
          {beatOffset === -1 ? null :
            <traxExt.components.TempoBar beat={beatOffset} />}
          {!showTimelinePreview ? null :
            <traxExt.components.TempoBar beat={timelinePreviewN} />}
          <traxExt.components.ChannelList ids={block.channels} isSoloMode={isSoloMode} />
        </div>
      </div>
    )
  }
}

BlockItem.propTypes = {
  block: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  isSoloMode: PropTypes.bool.isRequired,
  beatOffset: PropTypes.number.isRequired,
  onClickBody: PropTypes.func.isRequired,

  // Drag n drop props
  dragSource: PropTypes.number,
  onDragStart: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {block, dragSource}) => ({
  onClickBody() {
    dispatch(url.actions.setBrowserUrl('/blocks/' + block.id))
  },
  onDrop(to) {
    dispatch(songs.actions.moveBlock(block.song, dragSource, to))
  },
})

export default connect(null, mapDispatchToProps)(BlockItem)

import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {songs, songPlayer} from 'trax'
import {PureComponent} from 'loopda/lib/react-ext'
import blocksModule from '../../blocks'
import traxExt from '../../trax-ext'
import url from '../../url'

class BlockItem extends PureComponent {

  constructor(props) {
    super(props)
    this.handleClickTitle = this.handleClickTitle.bind(this)
    this.handleClickBeat = this.handleClickBeat.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.state = {dragging: false}
  }

  handleClickTitle() {
    this.props.onClickTitle(this.props.block.id)
  }

  handleClickBeat(event) {
    const beat = blocksModule.util.getBeatClicked(event, this.refs.channels)
    this.props.onClickBeat(this.props.i * 16 + beat)
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
    const {block, beatOffset} = this.props
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
        <a onClick={this.handleClickTitle}>{block.id}</a>
        <div ref="channels" className={innerCssClass} onClick={this.handleClickBeat} {...dragProps}>
          {beatOffset === -1 ? null :
            <blocksModule.components.TempoBar beat={beatOffset} />}
          <traxExt.containers.ChannelList ids={block.channels} />
        </div>
      </div>
    )
  }
}

BlockItem.propTypes = {
  block: React.PropTypes.object.isRequired,
  i: React.PropTypes.number.isRequired,
  beatOffset: React.PropTypes.number.isRequired,
  onClickTitle: React.PropTypes.func.isRequired,
  onClickBeat: React.PropTypes.func.isRequired,

  // Drag n drop props
  dragSource: React.PropTypes.number,
  onDragStart: React.PropTypes.func.isRequired,
  onDrop: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {block, dragSource}) => ({
  onClickTitle() {
    dispatch(url.actions.setBrowserUrl('/blocks/' + block.id))
  },
  onClickBeat(i) {
    dispatch(songPlayer.actions.setCurrentBeat(i))
  },
  onDrop(to) {
    dispatch(songs.actions.moveBlock(block.song, dragSource, to))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(BlockItem)

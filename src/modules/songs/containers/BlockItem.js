import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {channels, blocks, songs, songPlayer} from 'trax'
import blocksModule from '../../blocks'
import traxExt from '../../trax-ext'
import url from '../../url'

class BlockItem extends React.Component {

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
    const beat = traxExt.util.getBeatClicked(event, this.refs.channels)
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
    const {i, block, channels, currentBeat, isSoloMode} = this.props
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
          {currentBeat >= i * 16 && currentBeat < (i + 1) * 16 ?
            <blocksModule.components.TempoBar beat={currentBeat - i * 16} /> : null}
          <traxExt.components.ChannelList channels={channels} isSoloMode={isSoloMode} />
        </div>
      </div>
    )
  }
}

BlockItem.propTypes = {
  i: React.PropTypes.number.isRequired,
  block: React.PropTypes.object.isRequired,
  channels: React.PropTypes.array.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
  onClickTitle: React.PropTypes.func.isRequired,
  onClickBeat: React.PropTypes.func.isRequired,

  // Drag n drop props
  dragSource: React.PropTypes.number,
  onDragStart: React.PropTypes.func.isRequired,
  onDrop: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {block}) => ({
  channels: channels.selectors.getMany(block.channels)(state).filter(
    c => !c.archived
  ),
  isSoloMode: blocks.selectors.isSoloMode(block.id)(state),
})

const mapDispatchToProps = (dispatch, {block, dragSource}) => ({
  onClickTitle: () => {
    dispatch(url.actions.setBrowserUrl('/blocks/' + block.id))
  },
  onClickBeat: (i) => {
    dispatch(songPlayer.actions.setCurrentBeat(i))
  },
  onDrop: (to) => {
    dispatch(songs.actions.moveBlock(block.song, dragSource, to))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockItem)

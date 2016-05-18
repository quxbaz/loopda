import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {blocks, songs, songPlayer} from 'trax'
import blocksModule from '../../blocks'
import traxExt from '../../trax-ext'
import url from '../../url'
import ChannelList from '../containers/ChannelList'

class BlockItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClickTitle = this.handleClickTitle.bind(this)
    this.handleClickBeat = this.handleClickBeat.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
  }

  handleClickTitle() {
    this.props.onClickTitle(this.props.block.id)
  }

  handleClickBeat(event) {
    const beat = traxExt.util.getBeatClicked(event, this.refs.channels)
    this.props.onClickBeat(this.props.i * 16 + beat)
  }

  handleDragStart(event) {
    this.props.onDragStart(this.props.i)
  }

  handleDragOver(event) {
    event.preventDefault()
  }

  handleDrop(event) {
    event.preventDefault()
    this.props.onDrop(this.props.i)
  }

  render() {
    const {i, block, currentBeat, isSoloMode} = this.props
    const dragProps = {
      draggable: true,
      onDragStart: this.handleDragStart,
      onDragOver: this.handleDragOver,
      onDrop: this.handleDrop,
    }
    return (
      <div className="block-item">
        <a onClick={this.handleClickTitle}>{block.id}</a>
        <div ref="channels" className="relative" onClick={this.handleClickBeat} {...dragProps}>
          {currentBeat >= i * 16 && currentBeat < (i + 1) * 16 ?
            <blocksModule.components.TempoBar beat={currentBeat - i * 16} /> : null}
          <ChannelList ids={block.channels} isSoloMode={isSoloMode} />
        </div>
      </div>
    )
  }
}

BlockItem.propTypes = {
  i: React.PropTypes.number.isRequired,
  songId: React.PropTypes.string.isRequired,
  block: React.PropTypes.object.isRequired,
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
  isSoloMode: blocks.selectors.isSoloMode(block.id)(state),
})

const mapDispatchToProps = (dispatch, {songId, block, dragSource}) => ({
  onClickTitle: () => {
    dispatch(url.actions.setBrowserUrl('/songs/' + songId + '/blocks/' + block.id))
  },
  onClickBeat: (i) => {
    dispatch(songPlayer.actions.setCurrentBeat(i))
  },
  onDrop: (to) => {
    dispatch(songs.actions.moveBlock(songId, dragSource, to))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockItem)

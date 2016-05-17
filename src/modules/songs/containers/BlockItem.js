import React from 'react'
import {connect} from 'react-redux'
import {songPlayer} from 'trax'
import blocks from '../../blocks'
import traxExt from '../../trax-ext'
import url from '../../url'
import ChannelList from '../containers/ChannelList'

class BlockItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClickTitle = this.handleClickTitle.bind(this)
    this.handleClickBeat = this.handleClickBeat.bind(this)
  }

  handleClickTitle() {
    this.props.onClickTitle(this.props.block.id)
  }

  handleClickBeat(event) {
    const beat = traxExt.util.getBeatClicked(event, this.refs.channels)
    this.props.onClickBeat(this.props.i * 16 + beat)
  }

  render() {
    const {i, block, currentBeat} = this.props
    return (
      <div className="block-item">
        <a onClick={this.handleClickTitle}>{block.id}</a>
        <div ref="channels" className="relative" onClick={this.handleClickBeat}>
          {currentBeat >= i * 16 && currentBeat < (i + 1) * 16 ?
            <blocks.components.TempoBar beat={currentBeat - i * 16} /> : null}
          <ChannelList ids={block.channels} />
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
  onClickTitle: React.PropTypes.func.isRequired,
  onClickBeat: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {songId, block}) => ({
  onClickTitle: () => {
    dispatch(url.actions.setBrowserUrl('/songs/' + songId + '/blocks/' + block.id))
  },
  onClickBeat: (i) => {
    dispatch(songPlayer.actions.setCurrentBeat(i))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(BlockItem)

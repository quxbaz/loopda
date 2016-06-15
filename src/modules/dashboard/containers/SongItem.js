import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import traxExt from '../../trax-ext'
import url from '../../url'

class SongItem extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleDestroy = this.handleDestroy.bind(this)
    this.handleClickBlock = this.handleClickBlock.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.song.id)
  }

  handleDestroy() {
    this.props.onDestroy(this.props.song.id)
  }

  handleClickBlock(id) {
    this.props.onClickBlock(id)
  }

  render() {
    const {title} = this.props.song
    return (
      <li className="song-item">
        <a title={title} onClick={this.handleClick}>{title}</a>{' '}
        <traxExt.components.BlockList ids={this.props.song.blocks} onClickBlock={this.handleClickBlock} />
        {/*(<a onClick={this.handleDestroy}>remove</a>)*/}
      </li>
    )
  }

}

SongItem.propTypes = {
  song: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onClickBlock: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onClick(id) {
    dispatch(url.actions.setBrowserUrl('/songs/' + id))
  },
  onDestroy(id) {
    dispatch(songs.actions.destroy(id))
  },
  onClickBlock(id) {
    dispatch(url.actions.setBrowserUrl('/blocks/' + id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(SongItem)

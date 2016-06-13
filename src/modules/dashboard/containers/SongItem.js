import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import url from '../../url'

class SongItem extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleDestroy = this.handleDestroy.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.song.id)
  }

  handleDestroy() {
    this.props.onDestroy(this.props.song.id)
  }

  render() {
    const {title} = this.props.song
    return (
      <div className="song-item">
        <a onClick={this.handleClick}>{title}</a>{' '}
        (<a onClick={this.handleDestroy}>remove</a>)
      </div>
    )
  }

}

SongItem.propTypes = {
  song: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onClick(id) {
    dispatch(url.actions.setBrowserUrl('/songs/' + id))
  },
  onDestroy(id) {
    dispatch(songs.actions.destroy(id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(SongItem)

import React from 'react'

class SongItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClickRemove = this.handleClickRemove.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.song.id)
  }

  handleClickRemove() {
    this.props.onClickRemove(this.props.song.id)
  }

  render() {
    const {song, onClick} = this.props
    return (
      <div className="song-item">
        <a onClick={this.handleClick}>{song.title}</a>{' '}
        (<a onClick={this.handleClickRemove}>remove</a>)
      </div>
    )
  }

}

SongItem.propTypes = {
  song: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onClickRemove: React.PropTypes.func.isRequired,
}

export default SongItem

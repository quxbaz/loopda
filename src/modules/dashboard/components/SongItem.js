import React from 'react'

class SongItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.song.id)
  }

  handleClickDestroy() {
    this.props.onClickDestroy(this.props.song.id)
  }

  render() {
    const {song, onClick} = this.props
    return (
      <div className="song-item">
        <a onClick={this.handleClick}>{song.title}</a>{' '}
        (<a onClick={this.handleClickDestroy}>remove</a>)
      </div>
    )
  }

}

SongItem.propTypes = {
  song: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onClickDestroy: React.PropTypes.func.isRequired,
}

export default SongItem

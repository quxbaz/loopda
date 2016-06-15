import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import url from '../../url'
import {PureComponent} from 'loopda/lib/react-ext'

class SongControls extends PureComponent {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleDestroy = this.handleDestroy.bind(this)
    this.state = {
      warningActive: false,
    }
  }

  handleClick() {
    this.setState({warningActive: true})
  }

  handleCancel() {
    this.setState({warningActive: false})
  }

  handleDestroy() {
    this.props.onDestroy(this.props.id)
  }

  render() {
    const {warningActive} = this.state
    return (
      <div className="song-controls">
        {warningActive ?
          <div>
            Are you sure you want to delete this song?
            <a className="action cancel-action" onClick={this.handleCancel}>Close</a>
            <a className="action danger-action" onClick={this.handleDestroy}>Delete song!</a>
          </div> :
          <a className="action warning-action" onClick={this.handleClick}>Delete song</a>}
      </div>
    )
  }

}

SongControls.propTypes = {
  id: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onDestroy(id) {
    dispatch(url.actions.setBrowserUrl('/dashboard'))
    dispatch(songs.actions.destroy(id))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SongControls)

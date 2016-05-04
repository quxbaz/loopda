import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {channels, songs} from 'trax'

const Cell = ({active, channel, onClick}) => {

  const style = {}

  if (channel !== null)
    style.background = channel.color

  if (active)
    style.outline = '2px solid red'

  const cssClass = classNames({
    'song-grid-cell': true,
    active
  })

  return (
    <a className={cssClass} style={style} onClick={onClick}>
      {channel !== null ? `${channel.title} (${channel.number})` : '-'}
    </a>
  )

}

Cell.propTypes = {
  // id: string || null,
  active: React.PropTypes.bool,
  channel: React.PropTypes.object,
  position: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func.isRequired,
}

Cell.defaultProps = {
  active: false,
}

const mapStateToProps = (state, {id}) => ({
  channel: id === null ? null : channels.selectors.getById(id)(state)
})

const mapDispatchToProps = (dispatch, {position, onClick}) => ({
  onClick: () => {
    onClick(position)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell)

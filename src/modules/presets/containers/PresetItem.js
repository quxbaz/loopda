import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {presets} from 'trax'
import url from '../../url'

class PresetItem extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleDestroy = this.handleDestroy.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.preset.id)
  }

  handleDestroy() {
    this.props.onDestroy(this.props.preset.id)
  }

  render() {
    const {selected} = this.props
    const {title, sample} = this.props.preset
    const isDefault = title && title.startsWith('default ')
    return (
      <li className={classNames({
          "preset-item": true,
          selected,
        })}>
        <a onClick={this.handleClick}>
          {title || 'untitled'} ({sample})
        </a>{' '}
        {!isDefault && <a className="shy-btn clicky" onClick={this.handleDestroy}>delete</a>}
      </li>
    )
  }

}

PresetItem.propTypes = {
  preset: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onClick(id) {
    const action = url.actions.setBrowserUrl('/presets/' + id, {replaceState: true})
    dispatch(action)
  },
  onDestroy(id) {
    dispatch(url.actions.setBrowserUrl('/presets', {replaceState: true}))
    dispatch(presets.actions.destroy(id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(PresetItem)

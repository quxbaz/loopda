import React from 'react'
import {connect} from 'react-redux'
import {presets} from 'trax'
import url from '../../url'

class PresetItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClickRemove = this.handleClickRemove.bind(this)
  }

  handleClickRemove() {
    this.props.onClickRemove(this.props.preset.id)
  }

  render() {
    const {id, title, sample} = this.props.preset
    return (
      <li className="preset-item">
        <a href={'/#/presets/' + id}>
          {title || 'untitled'} ({sample})
        </a>{' '}
        <a onClick={this.handleClickRemove}>remove</a>
      </li>
    )
  }

}

PresetItem.propTypes = {
  preset: React.PropTypes.object.isRequired,
  onClickRemove: React.PropTypes.func.isRequired
}

const PresetList = ({presets, onClickRemovePreset}) => (
  <ul>
    {presets.map(preset => (
      <PresetItem key={preset.id} preset={preset}
       onClickRemove={onClickRemovePreset} />
    ))}
  </ul>
)

PresetList.propTypes = {
  presets: React.PropTypes.array.isRequired,
  onClickRemovePreset: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  presets: presets.selectors.getAll(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClickRemovePreset: (id) => {
    dispatch(
      url.actions.setBrowserUrl('/presets')
    )
    dispatch(
      presets.actions.removePreset(id)
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresetList)

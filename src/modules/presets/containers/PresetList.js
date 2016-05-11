import React from 'react'
import {connect} from 'react-redux'
import {presets} from 'trax'
import url from '../../url'

class PresetItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClickItem = this.handleClickItem.bind(this)
    this.handleClickRemove = this.handleClickRemove.bind(this)
  }

  handleClickItem() {
    this.props.onClickItem(this.props.preset.id)
  }

  handleClickRemove() {
    this.props.onClickRemove(this.props.preset.id)
  }

  render() {
    const {id, title, sample} = this.props.preset
    return (
      <li className="preset-item">
        <a onClick={this.handleClickItem}>
          {title || 'untitled'} ({sample})
        </a>{' '}
        <a onClick={this.handleClickRemove}>remove</a>
      </li>
    )
  }

}

PresetItem.propTypes = {
  preset: React.PropTypes.object.isRequired,
  onClickItem: React.PropTypes.func.isRequired,
  onClickRemove: React.PropTypes.func.isRequired,
}

const PresetList = ({presets, onClickPreset, onClickRemovePreset}) => (
  <ul>
    {presets.map(preset => (
      <PresetItem key={preset.id} preset={preset}
       onClickItem={onClickPreset}
       onClickRemove={onClickRemovePreset} />
    ))}
  </ul>
)

PresetList.propTypes = {
  presets: React.PropTypes.array.isRequired,
  onClickPreset: React.PropTypes.func.isRequired,
  onClickRemovePreset: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  presets: presets.selectors.getAll(state),
})

const mapDispatchToProps = (dispatch) => ({
  onClickPreset: (id) => {
    dispatch(
      url.actions.setBrowserUrl('/presets/' + id, {replaceState: true})
    )
  },
  onClickRemovePreset: (id) => {
    dispatch(
      url.actions.setBrowserUrl('/presets')
    )
    dispatch(
      presets.actions.removePreset(id)
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresetList)

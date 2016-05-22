import React from 'react'
import {connect} from 'react-redux'
import {presets} from 'trax'
import url from '../../url'

class PresetItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleClickItem = this.handleClickItem.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
  }

  handleClickItem() {
    this.props.onClickItem(this.props.preset.id)
  }

  handleClickDestroy() {
    this.props.onClickDestroy(this.props.preset.id)
  }

  render() {
    const {id, title, sample} = this.props.preset
    return (
      <li className="preset-item">
        <a onClick={this.handleClickItem}>
          {title || 'untitled'} ({sample})
        </a>{' '}
        <a onClick={this.handleClickDestroy}>remove</a>
      </li>
    )
  }

}

PresetItem.propTypes = {
  preset: React.PropTypes.object.isRequired,
  onClickItem: React.PropTypes.func.isRequired,
  onClickDestroy: React.PropTypes.func.isRequired,
}

const PresetList = ({presets, onClickPreset, onClickDestroyPreset}) => (
  <ul>
    {presets.map(preset => (
      <PresetItem key={preset.id} preset={preset}
       onClickItem={onClickPreset}
       onClickDestroy={onClickDestroyPreset} />
    ))}
  </ul>
)

PresetList.propTypes = {
  presets: React.PropTypes.array.isRequired,
  onClickPreset: React.PropTypes.func.isRequired,
  onClickDestroyPreset: React.PropTypes.func.isRequired,
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
  onClickDestroyPreset: (id) => {
    dispatch(
      url.actions.setBrowserUrl('/presets', {replaceState: true})
    )
    dispatch(
      presets.actions.destroy(id)
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresetList)

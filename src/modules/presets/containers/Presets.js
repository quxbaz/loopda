import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'stateful-router'
import {presets} from 'trax'
import AddPreset from './AddPreset'
import MixerWrapper from './MixerWrapper'

const PresetItem = ({preset, onClick}) => (
  <li className="preset-item">
    <a href={'/#/presets/' + preset.id}>
      {preset.title || 'untitled'} ({preset.sample})
    </a>
  </li>
)

PresetItem.propTypes = {
  preset: React.PropTypes.object.isRequired
}

const PresetList = ({presets}) => (
  <ul>
    {presets.map(preset => (
      <PresetItem key={preset.id} preset={preset} />
    ))}
  </ul>
)

PresetList.propTypes = {
  presets: React.PropTypes.array.isRequired
}

const Presets = ({presets}) => (
  <div className="presets">
    <AddPreset />
    <PresetList presets={presets} />
    <Route route=":id">
      <MixerWrapper />
    </Route>
  </div>
)

Presets.propTypes = {
  presets: React.PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  presets: presets.selectors.getAll(state)
})

export default connect(
  mapStateToProps
)(Presets)

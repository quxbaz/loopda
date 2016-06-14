import React from 'react'
import {Route} from 'stateful-router'
import Uploader from '../containers/Uploader'
import AddPreset from '../providers/AddPreset'
import PresetList from '../providers/PresetList'
import Mixer from '../providers/Mixer'

const Presets = () => (
  <div className="presets">
    <Uploader />
    <AddPreset />
    <Route route="/">
      <PresetList />
    </Route>
    <Route route=":id">
      <PresetList />
      <Mixer />
    </Route>
  </div>
)

export default Presets

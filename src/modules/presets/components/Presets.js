import React from 'react'
import {Route} from 'stateful-router'
import Uploader from '../containers/Uploader'
import AddPreset from '../containers/AddPreset'
import PresetList from '../containers/PresetList'
import MixerWrapper from '../containers/MixerWrapper'

const Presets = () => (
  <div className="presets">
    <Uploader />
    <AddPreset />
    <Route route="/">
      <PresetList />
    </Route>
    <Route route=":id">
      <PresetList />
      <MixerWrapper />
    </Route>
  </div>
)

export default Presets

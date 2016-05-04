import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'stateful-router'
import overview from '../../modules/overview'
import presets from '../../modules/presets'
import editor from '../../modules/editor'

// <TESTING>
import test from '../../modules/test'

const App = ({sequencer}) => (
  <div className="app">
    <ul>
      <li><a href='/#/'>Index</a></li>
      <li><a href='/#/overview'>Overview</a></li>
      <li><a href='/#/presets'>Presets</a></li>
      <li><a href='/#/songs'>Editor</a></li>
    </ul>
    <test.components.Profiler />
    <Route route="overview">
      <overview.containers.Overview sequencer={sequencer} />
    </Route>
    <Route route="presets">
      <presets.components.Presets />
    </Route>
    <Route route="songs">
      <editor.components.Editor />
    </Route>
  </div>
)

const mapStateToProps = (state) => ({
  sequencer: state.sequencer
})

export default connect(
  mapStateToProps
)(App)

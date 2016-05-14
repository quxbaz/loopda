import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'stateful-router'
import dashboard from '../../modules/dashboard'
import overview from '../../modules/overview'
import presets from '../../modules/presets'
import Saver from './Saver'

// <TESTING>
import test from '../../modules/test'

const TestControls = () => (
  <ul>
    <li><a onClick={() => console.clear()}>console.clear()</a></li>
    <li><a onClick={() => localStorage.clear()}>localStorage.clear()</a></li>
  </ul>
)

const App = ({player}) => (
  <div className="app">
    <ul>
      <li><a href='/#/'>Dashboard</a></li>
      <li><a href='/#/presets'>Presets</a></li>
      <li><a href='/#/songs'>Songs</a></li>
    </ul>
    <test.components.Profiler />
    <TestControls />
    <Saver />
    <Route route="/">
      <dashboard.containers.Dashboard />
    </Route>
    <Route route="songs">
      <overview.containers.Overview player={player} />
    </Route>
    <Route route="presets">
      <presets.components.Presets />
    </Route>
  </div>
)

const mapStateToProps = (state) => ({
  player: state.player
})

export default connect(
  mapStateToProps
)(App)

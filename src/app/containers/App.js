import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'stateful-router'
import dashboard from '../../modules/dashboard'
import presets from '../../modules/presets'
import blocks from '../../modules/blocks'
import songs from '../../modules/songs'
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
      <li><a href='/#/dashboard'>Dashboard</a></li>
      <li><a href='/#/presets'>Presets</a></li>
    </ul>
    <test.components.Profiler />
    <TestControls />
    <Saver />
    <Route route="dashboard">
      <dashboard.components.Dashboard />
    </Route>
    <Route route="presets">
      <presets.components.Presets />
    </Route>
    <Route route="songs/:id">
      <songs.containers.Song />
    </Route>
    <Route route="blocks/:id">
      <blocks.containers.Block />
    </Route>
  </div>
)

const mapStateToProps = (state) => ({
  player: state.player
})

export default connect(
  mapStateToProps
)(App)

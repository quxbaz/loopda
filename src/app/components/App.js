import React, {PropTypes} from 'react'
import {Router, Route} from 'stateful-router'
import dashboard from '../../modules/dashboard'
import presets from '../../modules/presets'
import blocks from '../../modules/blocks'
import songs from '../../modules/songs'
import Saver from '../containers/Saver'
import Nav from './Nav'

// <TESTING>
// import test from '../../modules/test'

const App = ({url}) => (
  <div className="app">
    <Router path={url}>
      <Nav />
      {/*<test.components.Profiler />*/}
      {/*<Saver />*/}
      <Route route="dashboard">
        <dashboard.components.Dashboard />
      </Route>
      <Route route="presets">
        <presets.components.Presets />
      </Route>
      <Route route="songs/:id">
        <songs.providers.Song />
      </Route>
      <Route route="blocks/:id">
        <blocks.providers.Block />
      </Route>
    </Router>
  </div>
)

App.propTypes = {
  url: PropTypes.string.isRequired,
}

export default App

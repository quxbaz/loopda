import React from 'react'
import {Route} from 'stateful-router'
import songs from '../../songs'

const Overview = () => (
  <div className="overview sequencer">
    <Route route=":id">
      <songs.containers.Song />
    </Route>
  </div>
)

Overview.propTypes = {}

export default Overview

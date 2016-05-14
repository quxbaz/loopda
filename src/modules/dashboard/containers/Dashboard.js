import React from 'react'
import {connect} from 'react-redux'
import SongControls from './SongControls'
import SongList from './SongList'

const Dashboard = () => (
  <div className="dashboard">
    <h2>Songs</h2>
    <SongControls />
    <SongList />
  </div>
)

Dashboard.propTypes = {}

export default connect(
  null,
  null
)(Dashboard)

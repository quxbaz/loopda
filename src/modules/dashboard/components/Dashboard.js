import React from 'react'
import SongControls from '../containers/SongControls'
import SongList from '../containers/SongList'

const Dashboard = () => (
  <div className="dashboard">
    <h2>Songs</h2>
    <SongControls />
    <SongList />
  </div>
)

Dashboard.propTypes = {}

export default Dashboard

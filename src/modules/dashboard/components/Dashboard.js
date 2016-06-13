import React from 'react'
import SongControls from '../containers/SongControls'
import SongList from '../providers/SongList'

const Dashboard = () => (
  <div className="dashboard">
    <h2>Songs</h2>
    <SongControls />
    <SongList />
  </div>
)

export default Dashboard

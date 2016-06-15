import React from 'react'
import SongControls from '../containers/SongControls'
import SongList from '../providers/SongList'

const Dashboard = () => (
  <div className="dashboard">
    <SongControls />
    <h2>My Songs</h2>
    <SongList />
  </div>
)

export default Dashboard

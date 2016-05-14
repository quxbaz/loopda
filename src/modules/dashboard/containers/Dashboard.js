import React from 'react'
import {connect} from 'react-redux'
import SongList from './SongList'

const Dashboard = () => (
  <div className="dashboard">
    <h2>Songs</h2>
    <SongList />
  </div>
)

Dashboard.propTypes = {}

export default connect(
  null,
  null
)(Dashboard)

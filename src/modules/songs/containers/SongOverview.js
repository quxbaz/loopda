import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import BlockGrid from '../components/BlockGrid'

const SongOverview = ({id, currentBeat, blocks}) => (
  <div className="song-overview">
    <BlockGrid currentBeat={currentBeat} blocks={blocks} />
  </div>
)

SongOverview.propTypes = {
  id: React.PropTypes.string.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  blocks: React.PropTypes.array.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  blocks: songs.selectors.getBlocks(id)(state),
})

export default connect(
  mapStateToProps
)(SongOverview)

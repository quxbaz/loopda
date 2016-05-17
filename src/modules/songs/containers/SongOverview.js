import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import BlockGrid from '../components/BlockGrid'

class SongOverview extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {song, currentBeat, blocks} = this.props
    return (
      <div className="song-overview">
        <BlockGrid songId={song.id} currentBeat={currentBeat} blocks={blocks} />
      </div>
    )
  }

}

SongOverview.propTypes = {
  song: React.PropTypes.object.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  blocks: React.PropTypes.array.isRequired,
}

const mapStateToProps = (state, {song}) => ({
  blocks: songs.selectors.getBlocks(song.id)(state),
})

export default connect(
  mapStateToProps
)(SongOverview)

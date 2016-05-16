import React from 'react'
import BlockGrid from './BlockGrid'

class SongOverview extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {song, blocks} = this.props
    return (
      <div className="song-overview">
        {/* song player controls */}
        <BlockGrid blocks={blocks} />
      </div>
    )
  }

}

SongOverview.propTypes = {
  song: React.PropTypes.object.isRequired,
  blocks: React.PropTypes.array.isRequired,
}

export default SongOverview

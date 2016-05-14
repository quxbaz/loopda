import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'stateful-router'
import {blockAdmin, songs} from 'trax'
import blocks from '../../blocks'
import BlockControls from './BlockControls'

const Song = ({song, currentBlock}) => (
  <div className="song">
    <h2>{song.title}</h2>
    <BlockControls block={currentBlock} />
    <Route route=":id">
       <blocks.containers.Block />
     </Route>
  </div>
)

Song.propTypes = {
  song: React.PropTypes.object.isRequired,
  currentBlock: React.PropTypes.object.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  song: songs.selectors.getById(id)(state),
  currentBlock: blockAdmin.selectors.getCurrentBlock(state),
})

export default connect(
  mapStateToProps
)(Song)

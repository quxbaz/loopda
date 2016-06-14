import {connect} from 'react-redux'
import {songs, blocks} from 'trax'
import Block from '../containers/Block'

const mapStateToProps = (state, {id}) => {
  const block = blocks.selectors.getById(id)(state)
  const song = songs.selectors.getById(block.song)(state)
  return {
    block,
    order: song.blocks.indexOf(id),
    isSoloMode: blocks.selectors.isSoloMode(id)(state),
  }
}

export default connect(mapStateToProps)(Block)

import {songs, blocks, songAdmin, blockAdmin} from 'trax'
import url from '../url'

const createDefaultSong = (title) => (dispatch) => {
  /*
    Creates a song with a new block and sets the url to that song.
  */
  const trimmedTitle = title.trim()
  const blockAction = blocks.actions.createBlock()
  const songAction = songs.actions.createSong({
    title: trimmedTitle,
    blocks: [blockAction.id],
  })
  dispatch(blockAction)
  dispatch(songAction)
  dispatch(songAdmin.actions.setCurrentSong(songAction.payload.id))
  dispatch(blockAdmin.actions.setCurrentBlock(blockAction.payload.id))
  dispatch(url.actions.navToSong(songAction.payload.id))
}

export default {
  createDefaultSong,
}

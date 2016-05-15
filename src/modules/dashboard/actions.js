import {songs, blocks} from 'trax'
import url from '../url'

const createDefaultSong = (title) => (dispatch) => {
  /*
    Creates a song with a new block and sets the url to that song.
  */

  const blockAction = blocks.actions.createBlock()
  dispatch(blockAction)
  const songAction = songs.actions.createSong({
    title: title.trim(),
    blocks: [blockAction.payload.id],
  })
  dispatch(songAction)
  dispatch(url.actions.navToSong(songAction.payload.id))
}

export default {
  createDefaultSong,
}

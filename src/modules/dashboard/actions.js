import {songs, blocks} from 'trax'
import url from '../url'

const createDefaultSong = (title) => (dispatch) => {
  /*
    Creates a song with a new block and sets the url to that song.
  */
  const blockAction = dispatch(blocks.actions.createBlock())
  const songAction = dispatch(songs.actions.createSong({
    title: title.trim(),
    blocks: [blockAction.payload.id],
  }))
  dispatch(url.actions.setBrowserUrl('/songs/' + songAction.payload.id))
}

export default {
  createDefaultSong,
}

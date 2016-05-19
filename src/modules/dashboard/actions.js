import {songs} from 'trax'
import url from '../url'

const createDefaultSong = (title) => (dispatch) => {
  /*
    Creates a song with a new block and sets the url to that song.
  */
  const action = dispatch(songs.actions.createSong({
    title: title.trim(),
  }))
  dispatch(songs.actions.createBlock(action.payload.id))
  dispatch(url.actions.setBrowserUrl('/songs/' + action.payload.id))
}

export default {
  createDefaultSong,
}

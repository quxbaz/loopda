import songs from '../songs'

const getCurrentSong = (state) => (
  songs.selectors.getById(state.songPlayer.currentSong)(state)
)

export default {getCurrentSong}

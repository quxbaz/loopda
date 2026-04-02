import {songs, blocks, presets} from 'trax'
import url from '../url'
import traxExt from '../trax-ext'

const createDefaultSong = (title) => (dispatch, getState) => {
  /*
    Creates a song with a new block and sets the url to that song.
  */
  const songAction = dispatch(songs.actions.create({
    title: title.trim(),
  }))
  const blockAction = dispatch(songs.actions.createBlock(songAction.payload.id))
  const blockId = blockAction.payload.id

  const allPresets = presets.selectors.getAll(getState())
  allPresets.forEach((preset) => {
    const channelAction = dispatch(traxExt.actions.createChannel({preset: preset.id}))
    dispatch(blocks.actions.addChannel(blockId, channelAction.payload.id))
  })

  dispatch(url.actions.setBrowserUrl('/songs/' + songAction.payload.id))
}

export default {
  createDefaultSong,
}

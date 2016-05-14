import {songs} from 'trax'

export const actionTypes = {
  SET_URL: 'loopda/url/SET_URL'
}

const setUrl = (url) => ({
  type: actionTypes.SET_URL,
  payload: url
})

// Changes the browser url along with the store url
const setBrowserUrl = (url, options={}) => (dispatch) => {
  if (options.replaceState) {
    const prepend = '/#' + (url.startsWith('/') ? '' : '/')
    window.history.replaceState({}, '', prepend + url)
  } else {
    location.hash = url
  }
  dispatch(setUrl(url))
}

const navToSong = (id) => (dispatch, getState) => {
  /*
    Navigates to a song url and its first block if it exists.
  */
  const {blocks} = songs.selectors.getById(id)(getState())
  const blockId = blocks.length === 0 ? undefined : blocks[0]
  let songUrl = '/songs/' + id
  if (blockId)
    songUrl += '/blocks/' + blockId
  dispatch(
    setBrowserUrl(songUrl)
  )
}

export default {
  setUrl, setBrowserUrl,
  navToSong,
}

export const actionTypes = {
  SET_URL: 'loopda/url/SET_URL'
}

const setUrl = (url) => ({
  type: actionTypes.SET_URL,
  payload: url
})

// Changes the browser url along with the store url
const setBrowserUrl = (url) => (dispatch) => {
  location.hash = url
  dispatch(setUrl(url))
}

export default {setUrl, setBrowserUrl}

export const actionTypes = {
  SET_URL: 'loopda/url/SET_URL'
}

const setUrl = (url) => ({
  type: actionTypes.SET_URL,
  payload: url
})

export default {setUrl}

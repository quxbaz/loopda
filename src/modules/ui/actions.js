import {channels} from 'trax'

export const actionTypes = {
  SET_PAGE: 'loopda/ui/SET_PAGE',
  SET_PAGE_SIZE: 'loopda/ui/SET_PAGE_SIZE',
  FIRST_PAGE: 'loopda/ui/FIRST_PAGE',
  LAST_PAGE: 'loopda/ui/LAST_PAGE',
  NEXT_PAGE: 'loopda/ui/NEXT_PAGE',
  PREV_PAGE: 'loopda/ui/PREV_PAGE',
}

const setPage = (page) => ({
  type: actionTypes.SET_PAGE,
  payload: page
})

const setPageSize = (size) => ({
  type: actionTypes.SET_PAGE_SIZE,
  payload: size
})

const firstPage = () => ({
  type: actionTypes.FIRST_PAGE
})

const lastPage = () => (dispatch, getState) => {
  const state = getState()
  const nChannels = channels.selectors.getAll(state).length
  dispatch({
    type: actionTypes.LAST_PAGE,
    payload: Math.ceil(nChannels / state.ui.pager.size) - 1,
  })
}

const nextPage = () => ({
  type: actionTypes.NEXT_PAGE
})

const prevPage = () => ({
  type: actionTypes.PREV_PAGE
})

export default {
  setPage, setPageSize,
  firstPage, lastPage,
  nextPage, prevPage
}

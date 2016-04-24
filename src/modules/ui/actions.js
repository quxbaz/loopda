export const actionTypes = {
  SET_PAGE: 'loopda/ui/SET_PAGE',
  FIRST_PAGE: 'loopda/ui/FIRST_PAGE',
  LAST_PAGE: 'loopda/ui/LAST_PAGE',
  NEXT_PAGE: 'loopda/ui/NEXT_PAGE',
  PREV_PAGE: 'loopda/ui/PREV_PAGE',
}

const setPage = (page) => ({
  type: actionTypes.SET_PAGE,
  payload: page
})

const firstPage = () => ({
  type: actionTypes.FIRST_PAGE
})

const lastPage = () => ({
  type: actionTypes.LAST_PAGE
})

const nextPage = () => ({
  type: actionTypes.NEXT_PAGE
})

const prevPage = () => ({
  type: actionTypes.PREV_PAGE
})

export default {setPage, firstPage, lastPage, nextPage, prevPage}

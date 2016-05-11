import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import url from 'loopda/src/modules/url'

describe("reducer", () => {

  describe("setUrl", () => {
    it("Sets the url.", () => {
      const stateBefore = ''
      const action = url.actions.setUrl('all')
      const stateAfter = 'all'
      expect(
        url.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })
  })

  describe("setBrowserUrl", () => {
    it("Sets the store url and the actual browser url.", () => {
      const store = createStore(
        combineReducers({url: url.reducer}),
        applyMiddleware(thunk)
      )
      store.dispatch(url.actions.setBrowserUrl('/all'))
      expect(store.getState()).toEqual({url: '/all'})
      expect(location.hash).toEqual('#/all')
    })
    it("Sets the store url and the actual browser url with history.replaceState()", () => {
      const store = createStore(
        combineReducers({url: url.reducer}),
        applyMiddleware(thunk)
      )
      store.dispatch(url.actions.setBrowserUrl('/all', {replaceState: true}))
      expect(store.getState()).toEqual({url: '/all'})
      expect(location.hash).toEqual('#/all')
      // Without leading slash
      store.dispatch(url.actions.setBrowserUrl('all', {replaceState: true}))
      expect(store.getState()).toEqual({url: 'all'})
      expect(location.hash).toEqual('#/all')
    })
  })

})

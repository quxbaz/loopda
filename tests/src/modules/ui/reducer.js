import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {channels} from 'trax'
import ui from 'loopda/src/modules/ui'

describe("reducer", () => {

  describe("setPage", () => {
    it("Sets the current page.", () => {
      const stateBefore = {pager: {current: 0}}
      const action = ui.actions.setPage(10)
      const stateAfter = {pager: {current: 10}}
      expect(
        ui.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })
  })

  describe("setPageSize", () => {
    it("Sets the page size.", () => {
      const stateBefore = {pager: {size: 30}}
      const action = ui.actions.setPageSize(100)
      const stateAfter = {pager: {size: 100}}
      expect(
        ui.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })
  })

  describe("firstPage", () => {
    it("Goes to the first page.", () => {
      const stateBefore = {pager: {current: 4}}
      const action = ui.actions.firstPage()
      const stateAfter = {pager: {current: 0}}
      expect(
        ui.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })
  })

  describe("lastPage", () => {
    it("Goes to the last page.", () => {
      const stateBefore = {
        ui: {
          pager: {
            current: 0,
            size: 2,
          },
        },
        channels: {
          1: {}, 2: {},
          3: {}, 4: {},
          5: {}, 6: {},
        }
      }
      const store = createStore(
        combineReducers({
          ui: ui.reducer,
          channels: channels.reducer,
        }),
        stateBefore,
        applyMiddleware(thunk)
      )
      const action = ui.actions.lastPage()
      const stateAfter = {
        ui: {
          pager: {
            current: 2,
            size: 2,
          },
        },
        channels: {
          1: {}, 2: {},
          3: {}, 4: {},
          5: {}, 6: {},
        }
      }
      store.dispatch(action)
      expect(
        store.getState()
      ).toEqual(stateAfter)
    })
  })

  describe("nextPage", () => {
    it("Goes to the next page.", () => {
      const stateBefore = {pager: {current: 4}}
      const action = ui.actions.nextPage()
      const stateAfter = {pager: {current: 5}}
      expect(
        ui.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })
  })

  describe("prevPage", () => {
    it("Goes to the previous page.", () => {
      const stateBefore = {pager: {current: 4}}
      const action = ui.actions.prevPage()
      const stateAfter = {pager: {current: 3}}
      expect(
        ui.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })
    it("Does not set the previous page below 0.", () => {
      const stateBefore = {pager: {current: 0}}
      const action = ui.actions.prevPage()
      const stateAfter = {pager: {current: 0}}
      expect(
        ui.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })
  })

})

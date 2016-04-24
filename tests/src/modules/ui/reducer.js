import expect from 'expect'
import ui from 'loopda/src/modules/ui'

describe("reducer", () => {

  describe("setPage", () => {
    it("Sets the page.", () => {
      const stateBefore = {pager: {current: 0}}
      const action = ui.actions.setPage(10)
      const stateAfter = {pager: {current: 10}}
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
      expect(false).toBe(true)
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

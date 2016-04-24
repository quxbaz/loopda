import expect from 'expect'
import ui from 'loopda/src/modules/ui'

describe("selectors", () => {

  describe("getPager()", () => {
    it("Gets the pager.", () => {
      const pager = {current: 0, size: 10}
      const state = {ui: {pager}}
      expect(
        ui.selectors.getPager(state)
      ).toEqual(pager)
    })
  })

})

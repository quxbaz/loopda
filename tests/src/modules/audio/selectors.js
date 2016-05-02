import expect from 'expect'
import audio from 'loopda/src/modules/audio'

describe("selectors", () => {

  describe("getSamples()", () => {
    it("Gets all samples.", () => {
      const samples = ['kick', 'blast', 'bump']
      const state = {
        audio: {
          samples
        }
      }
      expect(
        audio.selectors.getSamples(state)
      ).toEqual(samples)
    })
  })

})

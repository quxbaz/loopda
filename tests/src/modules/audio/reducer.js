import expect from 'expect'
import audio from 'loopda/src/modules/audio'

describe("reducer", () => {

  describe("addSample", () => {
    it("Adds a sample.", () => {
      const stateBefore = {
        samples: []
      }
      const action = audio.actions.addSample('hihat')
      const stateAfter = {
        samples: ['hihat']
      }
      expect(
        audio.reducer(stateBefore, action)
      ).toEqual(stateAfter)

      // Add one more sample
      expect(
        audio.reducer(stateAfter, audio.actions.addSample('kick'))
      ).toEqual({
        samples: ['hihat', 'kick']
      })
    })
  })

})

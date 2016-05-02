const actionTypes = {
  ADD_SAMPLE: 'loopda/audio/ADD_SAMPLE'
}

const addSample = (sample) => ({
  type: actionTypes.ADD_SAMPLE,
  payload: sample
})

export {actionTypes}
export default {addSample}

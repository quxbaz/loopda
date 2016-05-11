import {db} from 'loopda/src/db'
import {createAudioBuffer} from 'loopda/src/audio/helper'

const actionTypes = {
  ADD_SAMPLE: 'loopda/audio/ADD_SAMPLE'
}

const addSample = (sample) => ({
  type: actionTypes.ADD_SAMPLE,
  payload: sample
})

const uploadSampleFile = (file) => (dispatch) => {
  createAudioBuffer.from.file(file).then(() => {
    dispatch(addSample(file.name))
  })
}

export {actionTypes}
export default {
  addSample, uploadSampleFile,
}

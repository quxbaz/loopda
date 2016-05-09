import each from 'qux/lib/each'
import {loadAudioBuffer} from './webaudio'
import audioContext from '../globals/audioContext'
import audioService from '../globals/audioService'
import audio from '../modules/audio'

const loadAudioSamples = (dispatch, samples) => {

  const sampleList = Object.keys(samples).map((key) => ({
    name: key,
    url: samples[key],
  }))

  return Promise.all(sampleList.map(({url}) =>
    // Load urls and return audio buffers
    loadAudioBuffer(audioContext, url)
  )).then((audioBuffers) => {
    // Generate a name => buffer map
    const sampleMap = {}
    sampleList.forEach(({name}, i) => {
      sampleMap[name] = audioBuffers[i]
    })
    return sampleMap
  }).then((sampleMap) => {
    // Add new samples to global audioService
    Object.assign(audioService.sampleMap, sampleMap)
    // Dispatch changes to Redux store
    each(sampleMap, (val, key) => {
      dispatch(audio.actions.addSample(key))
    })
  })

}

const loadAudioFile = (dispatch, file) => {
  const {name, type} = file
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  return new Promise((resolve) => {
    reader.onload = (event) => {
      const url = window.URL.createObjectURL(
        new Blob([event.target.result], {type})
      )
      loadAudioSamples(dispatch, {[name]: url}).then(() => {
        window.URL.revokeObjectURL(url)
        resolve()
      })
    }
  })
}

export {
  loadAudioSamples,
  loadAudioFile,
}

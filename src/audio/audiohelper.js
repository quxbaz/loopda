import each from 'qux/lib/each'
import {fetchAudio} from './webaudio'
import audioService from '../globals/audioService'
import audio from '../modules/audio'
import dataUrlToBlob from './dataUrlToBlob'

const loadAudioSamples = (dispatch, samples) => {

  const sampleList = Object.keys(samples).map((key) => ({
    name: key,
    url: samples[key],
  }))

  return Promise.all(sampleList.map(({url}) =>
    // Load urls and return audio buffers
    fetchAudio(url)
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

// <TODO> Add to indexedDB
const loadAudioFile = (dispatch, file) => {

  const {name, type} = file

  const reader = new FileReader()
  reader.readAsDataURL(file)

  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      const data = dataUrlToBlob(event.target.result)
      const url = window.URL.createObjectURL(
        new Blob([data], {type})
      )
      loadAudioSamples(dispatch, {[name]: url}).then(() => {
        window.URL.revokeObjectURL(url)
        resolve()
      }).catch((error) => reject(error))
    }
  })

}

// import {decode} from './webaudio'

// // TEMP
// const loadFromLocalStorage = (dispatch) => {

//   const data = dataUrlToBlob(
//     JSON.parse(
//       localStorage.getItem('sample/bang.mp3')
//     )
//   )

//   const name = 'bang.mp3'
//   reader.readAsArrayBuffer(data)
//   reader.onload

//   // const url = window.URL.createObjectURL(
//   //   new Blob([data], {type: 'audio/mp3'})
//   // )

//   return new Promise((resolve, reject) => {
//     console.dir(data)
//     decode([data])
//     // loadAudioSamples(dispatch, {[name]: url}).then(() => {
//     //   window.URL.revokeObjectURL(url)
//     //   resolve()
//     // }).catch((error) => reject(error))
//   }).then((buffer) => {
//     Object.assign(audioService.sampleMap, {bang: buffer})
//     // Dispatch changes to Redux store
//     dispatch(audio.actions.addSample('bang'))
//   })
// }

export {
  loadAudioSamples,
  loadAudioFile,
}

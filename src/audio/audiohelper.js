import each from 'qux/lib/each'
import {loadAudioBuffer} from './webaudio'
import audioService from '../globals/audioService'
import audio from '../modules/audio'

export function loadAudioSamples(store, audioContext, samples) {

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
      store.dispatch(audio.actions.addSample(key))
    })
  })

}

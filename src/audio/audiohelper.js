import {loadAudioBuffer} from './webaudio'

export function loadAudioSamples(audioContext, samples) {

  samples = Object.keys(samples).map(key =>
    ({
      name: key,
      url: samples[key]
    })
  )

  return Promise.all(samples.map((sample) => {
    return loadAudioBuffer(audioContext, sample.url)
  })).then((audioBuffers) => {
    let sampleMap = {}
    samples.forEach((sample, i) => {
      sampleMap[sample.name] = audioBuffers[i]
    })
    return sampleMap
  })

}

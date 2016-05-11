import db from '../db'
import audioService from '../globals/audioService'
import {decode} from './webaudio'
import {
  fromArrayBufferToString,
  fromStringToArrayBuffer
} from './format'

const defaultOptions = Object.freeze({

  // If true caches array buffer in indexedDB
  cache: true,

  // If true, updates audioService with a reference to the audio buffer
  updateAudioService: true,

})

const toAudioBuffer = (arrayBuffer, options={}) => {

  /*
    Converts an ArrayBuffer -> AudioBuffer and performs optional
    indexedDB caching and updating to global audioService.
  */

  options = Object.assign({}, defaultOptions, options)

  if (options.cache) {
    if (options.name === undefined)
      throw new Error('You must provide a name property in @options.')
    db.addSample({
      name: options.name,
      data: fromArrayBufferToString(arrayBuffer),
    })
  }

  return decode(arrayBuffer).then((audioBuffer) => {
    if (options.updateAudioService) {
      if (options.name === undefined)
        throw new Error('You must provide a name in options parameter.')
      Object.assign(audioService.sampleMap, {[options.name]: audioBuffer})
    }
    return audioBuffer
  })

}

const createAudioBuffer = {from: {}}

createAudioBuffer.from.url = (url, name) => {
  return fetch(url).then(
    (response) => response.arrayBuffer()
  ).then(
    (arrayBuffer) => toAudioBuffer(arrayBuffer, {name})
  )
}

createAudioBuffer.from.file = (file) => {
  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file)
  return new Promise((resolve, reject) => {
    fileReader.onload = (event) => {
      const arrayBuffer = event.target.result
      resolve(
        toAudioBuffer(arrayBuffer, {name: file.name})
      )
    }
  })
}

createAudioBuffer.from.db = (record) => {
  const {name, data} = record
  const arrayBuffer = fromStringToArrayBuffer(data)
  return toAudioBuffer(arrayBuffer, {name, cache: false})
}

export {createAudioBuffer}

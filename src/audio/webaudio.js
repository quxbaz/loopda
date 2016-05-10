import audioContext from 'loopda/src/globals/audioContext'

const decode = (arrayBuffer) => {
  /*
    Async function that decodes an audio buffer.
  */
  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(
      arrayBuffer,
      (audioBuffer) => {
        if (!audioBuffer)
          reject('webaudio.decode Error:', url)
        resolve(audioBuffer)
      },
      (error) => reject('AudioContext.decodeAudioData error:', error)
    )
  })
}

const fetchAudio = (url) => {
  /*
    Makes a server request to an audio file and decodes it.
  */
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(decode)
}

export {fetchAudio, decode}

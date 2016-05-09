import audioContext from 'loopda/src/globals/audioContext'

const decode = (audioBuffer) => {
  /*
    Async function that decodes an audio buffer.
  */
  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(
      audioBuffer,
      (decoded) => {
        if (!decoded)
          reject('webaudio.decode Error:', url)
        resolve(decoded)
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
    .then(resp => resp.arrayBuffer())
    .then(decode)
}

export {fetchAudio, decode}

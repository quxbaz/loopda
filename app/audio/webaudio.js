/*
  <TODO>
  Make this a standard  module.
*/

import http from 'http';

function decode(audioContext, audioBuffer) {
  /*
    Async function that decodes an audio buffer.
  */
  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(
      audioBuffer,
      (decoded) => {
        if (!decoded)
          reject('Decoding error:', url);
        resolve(decoded);
      },
      (error) => reject('decodeAudioData error:', error)
    );
  });
}

export function loadAudioBuffer(audioContext, url) {
  /*
    Makes a server request to an audio file and decodes it.
  */
  return http.get(url, {responseType: 'arraybuffer'}).then(
    buffer => decode(audioContext, buffer),
    error => console.error('Error getting resource:', error)
  );
}

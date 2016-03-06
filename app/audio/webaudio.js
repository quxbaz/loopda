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
  return fetch(url).then((resp) =>
    resp.arrayBuffer()
  ).then((arrayBuffer) =>
    decode(audioContext, arrayBuffer)
  );
}

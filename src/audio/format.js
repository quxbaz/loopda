const fromArrayBufferToString = (buffer) => {
  return String.fromCharCode.apply(null, new Uint8Array(buffer))
}

const fromStringToArrayBuffer = (str) => {
  var buffer = new ArrayBuffer(str.length*2) // 2 bytes for each char
  var bufferView = new Uint8Array(buffer)
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufferView[i] = str.charCodeAt(i)
  }
  return buffer
}

export {fromArrayBufferToString, fromStringToArrayBuffer}

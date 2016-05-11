// /*
//   Source: http://stackoverflow.com/a/16365505/376590
// */

// function ArrayBufferToString(buffer) {
//   return BinaryToString(String.fromCharCode.apply(null, Array.prototype.slice.apply(new Uint8Array(buffer))));
// }

// function StringToArrayBuffer(string) {
//   return StringToUint8Array(string).buffer;
// }

// function BinaryToString(binary) {
//   var error;

//   try {
//     return decodeURIComponent(escape(binary));
//   } catch (_error) {
//     error = _error;
//     if (error instanceof URIError) {
//       return binary;
//     } else {
//       throw error;
//     }
//   }
// }

// function StringToBinary(string) {
//   var chars, code, i, isUCS2, len, _i;

//   len = string.length;
//   chars = [];
//   isUCS2 = false;
//   for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
//     code = String.prototype.charCodeAt.call(string, i);
//     if (code > 255) {
//       isUCS2 = true;
//       chars = null;
//       break;
//     } else {
//       chars.push(code);
//     }
//   }
//   if (isUCS2 === true) {
//     return unescape(encodeURIComponent(string));
//   } else {
//     return String.fromCharCode.apply(null, Array.prototype.slice.apply(chars));
//   }
// }

// function StringToUint8Array(string) {
//   var binary, binLen, buffer, chars, i, _i;
//   binary = StringToBinary(string);
//   binLen = binary.length;
//   buffer = new ArrayBuffer(binLen);
//   chars  = new Uint8Array(buffer);
//   for (i = _i = 0; 0 <= binLen ? _i < binLen : _i > binLen; i = 0 <= binLen ? ++_i : --_i) {
//     chars[i] = String.prototype.charCodeAt.call(binary, i);
//   }
//   return chars;
// }

// export {ArrayBufferToString, StringToBinary}

/*
  Source: http://stackoverflow.com/a/11058858/376590
*/

function fromArrayBufferToString(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function fromStringToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export {fromArrayBufferToString, fromStringToArrayBuffer}

'use strict';

let nibbleUtils = module.exports = {
  composeByte: (highNibble, lowNibble) => highNibble << 4 | lowNibble,

  extractHighNibble: byte => byte >> 4,

  extractLowNibble: byte => byte & 15,

  nibblesToBytes(nibbles) {
    let evenLength = nibbles.length - nibbles.length % 2,
      bytes = [];

    for (let i = 0; i < evenLength; i += 2) {
      let byte = nibbleUtils.composeByte(nibbles[i], nibbles[i + 1])
      bytes.push(byte);
    }

    if (evenLength < nibbles.length) {
      bytes.push(nibbles[nibbles.length - 1] << 4);
    }

    return bytes;
  }
}
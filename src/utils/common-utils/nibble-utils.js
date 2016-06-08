'use strict';

/* jshint esversion: 6 */


let nibbleUtils = module.exports = {
  composeByte: (highNibble, lowNibble) => highNibble << 4 | lowNibble,

  extractHighNibble: function (byte) {
    return byte >> 4;
  },

  extractLowNibble: function (byte) {
    return byte & 15;
  },

  nibblesToBytes: function (nibbles) {
    let evenLength = nibbles.length - nibbles.length % 2,
      bytes = [];

    for (let i = 0; i < evenLength; i += 2) {
      let byte = nibbleUtils.composeByte(nibbles[i], nibbles[i + 1]);
      bytes.push(byte);
    }

    if (evenLength < nibbles.length) {
      bytes.push(nibbles[nibbles.length - 1] << 4);
    }

    return bytes;
  },

  forEachNibble: function (bytes, callback) {
    bytes.forEach(function (byte, index) {
      var highNibble = nibbleUtils.extractHighNibble(byte),
        lowNibble = nibbleUtils.extractLowNibble(byte);

      callback(highNibble);
      callback(lowNibble);
    });
  }
};

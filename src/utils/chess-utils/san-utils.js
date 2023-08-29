'use strict';

const squareNamePattern = /^[a-h][1-8]$/,
  fileNames = 'abcdefgh'.split('');

const LAN_PATTERN = /^([a-h][1-8])([a-h][1-8])([rnbq]?)$/;

module.exports = {
  isSquareName(arg) {
    return squareNamePattern.test(arg);
  },

  isFileName(arg) {
    return fileNames.indexOf(arg) > -1;
  },

  isRankName(arg) {
    return 0 < arg && arg < 9;
  },

  parseLAN(move) {
    const match = move.match(LAN_PATTERN);

    if (match === null) {
      return null;
    }

    const [ , from, to, promoteTo ] = match;

    return [ from, to, promoteTo || null ];
  }
};

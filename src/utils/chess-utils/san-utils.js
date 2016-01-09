'use strict';

var squareNamePattern = /^[a-h][1-8]$/,
  fileNames = 'abcdefgh'.split('');

var sanUtils = module.exports = {
  isSquareName: function (arg) {
    return squareNamePattern.test(arg);
  },

  isFileName: function (arg) {
    return fileNames.indexOf(arg) > -1;
  },

  isRankName: function (arg) {
    return 0 < arg && arg < 9;
  }
};

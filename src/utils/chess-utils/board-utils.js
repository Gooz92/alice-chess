'use strict';

var attacks = require('./attacks');

var RAYS = [
   17,   0,   0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 15, 0,
    0,  17,   0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 15, 0, 0,
    0,   0,  17, 0, 0, 0, 0, 16, 0, 0, 0, 0, 15, 0, 0, 0,
    0,   0,   0, 17, 0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 0,
    0,   0,   0, 0, 17, 0, 0, 16, 0, 0, 15, 0, 0, 0, 0, 0,
    0,   0,   0, 0, 0, 17, 0, 16, 0, 15, 0, 0, 0, 0, 0, 0,
    0,   0,   0, 0, 0, 0, 17, 16, 15, 0, 0, 0, 0, 0, 0, 0,
    1,   1,   1, 1, 1, 1, 1, 0, -1, -1, -1,-1, -1, -1, -1, 0,
    0,   0,   0, 0, 0, 0,-15,-16,-17, 0, 0, 0, 0, 0, 0, 0,
    0,   0,   0, 0, 0,-15, 0,-16, 0,-17, 0, 0, 0, 0, 0, 0,
    0,   0,   0, 0,-15, 0, 0,-16, 0, 0,-17, 0, 0, 0, 0, 0,
    0,   0,   0,-15, 0, 0, 0,-16, 0, 0, 0,-17, 0, 0, 0, 0,
    0,   0, -15, 0, 0, 0, 0,-16, 0, 0, 0, 0,-17, 0, 0, 0,
    0, -15,   0, 0, 0, 0, 0,-16, 0, 0, 0, 0, 0,-17, 0, 0,
  -15,   0,   0, 0, 0, 0, 0,-16, 0, 0, 0, 0, 0, 0,-17
];

var pieceAttackMasks = {
  p: 1,
  n: 2,
  b: 4,
  r: 8,
  q: 16,
  k: 32
};

var fileNames = 'abcdefgh';

var boardUtils = module.exports = {
  isLineIndex: function (arg) {
    return 0 <= arg && arg < 8;
  },

  fileIndexToName: function (fileIndex) {
    return fileNames.charAt(fileIndex);
  },

  fileNameToIndex: function (fileName) {
    return fileNames.indexOf(fileName);
  },

  rankIndexToName: function (rankIndex) {
    var rankName = rankIndex + 1;
    return rankName.toString();
  },

  rankNameToIndex: function (rankName) {
    return rankName - 1;
  },

  fileIndexFromSquareIndex: function (squareIndex) {
    return squareIndex & 7;
  },

  rankIndexFromSquareIndex: function (squareIndex) {
    return squareIndex >> 4;
  },

  fileNameFromSquareIndex: function (squareIndex) {
    var fileIndex = boardUtils.fileIndexFromSquareIndex(squareIndex),
      fileName = boardUtils.fileIndexToName(fileIndex);

    return fileName;
  },

  rankNameFromSquareIndex: function (squareIndex) {
    var rankIndex = boardUtils.rankIndexFromSquareIndex(squareIndex),
      rankName = boardUtils.rankIndexToName(rankIndex);

    return rankName;
  },

  squareIndexToName: function (squareIndex) {
    var fileName = boardUtils.fileNameFromSquareIndex(squareIndex),
      rankName = boardUtils.rankNameFromSquareIndex(squareIndex);

    return fileName + rankName;
  },

  squareNameToIndex: function (squareName) {
    var fileName = squareName.charAt(0),
      rankName = squareName.charAt(1),
      fileIndex = boardUtils.fileNameToIndex(fileName),
      rankIndex = boardUtils.rankNameToIndex(rankName);

    return 16 * rankIndex + fileIndex;
  },

  isSquareOnBoard: function (squareIndex) {
    return (squareIndex & 136) === 0;
  },

  isSquareOutOfBoard: function (squareIndex) {
    return (squareIndex & 136) !== 0;
  },

  isMayAttacked: function (attackIndex, pieceToken) {
    return (attacks[attackIndex] & pieceAttackMasks[pieceToken]) !== 0;
  }
};

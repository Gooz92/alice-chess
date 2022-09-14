'use strict';

const squares = require('./squares');

const fileNames = 'abcdefgh';

const boardUtils = module.exports = {
  squareIndexes: Object.keys(squares).map(squareName => squares[squareName]),

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
    return squares[squareName];
  },

  isSquareOnBoard: function (squareIndex) {
    return (squareIndex & 136) === 0;
  },

  isSquareOutOfBoard: function (squareIndex) {
    return (squareIndex & 136) !== 0;
  }
};

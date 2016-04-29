'use strict';

/* jshint esnext: true */

var squares = require('../utils/chess-utils/squares'),
  boardUtils = require('../utils/chess-utils/board-utils');

var squareIndexex = Object.keys(squares).map(function (squareName) {
  return squares[squareName];
});

var offsets = {
  r: [1, -1, 16, -16],
  b: [15, 17, -15, -17],
  q: [15, 17, -15, -17, -1, 1, 16, -16]
};

function generateLongRangedPieceTargetIndexes(sourceIndex, offsets) {
  var targetIndexes = [];

  offsets.forEach(function (offset) {
    var targetIndex = sourceIndex;

    while (boardUtils.isSquareOnBoard(targetIndex += offset)) {
      targetIndexes.push(targetIndex);
    }
  });

  return targetIndexes;
}

function generateLongRangedMoveTable(offsets) {
  var table = {};

  Object.keys(squares).forEach(squareName => {
    var squareIndex = squares[squareName];
    table[squareName] = generateLongRangedPieceTargetIndexes(
      squareIndex,
      offsets
    );
  });

  return table;
}

var table = {};

Object.keys(offsets).forEach(pieceToken => {
  table[pieceToken] = generateLongRangedMoveTable(offsets[pieceToken]);
});

console.log(JSON.stringify(table));
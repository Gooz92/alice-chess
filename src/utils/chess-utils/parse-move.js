'use strict';

var pattern = /^([RNBQK])?([a-h])?([1-8])?(x)?([a-h][1-8])(\=([RNBQ]))?(\+#)?$/,
  pieceTokenIndex = 1,
  fromFileIndex = 2,
  fromRankIndex = 3,
  captureFlagIndex = 4,
  destinationSquareIndex = 5,
  promotedPieceIndex = 7;

function parseMoveName(moveName, position) {
  var match = pattern.exec(moveName),
    pieceToken = match[pieceTokenIndex],
    destinationSquareName = match[destinationSquareIndex],
    capture = match[captureFlagIndex] ? true : false,
    promotion = match[promotedPieceIndex],
    move = {
      piece: pieceToken || 'P',
      to: destinationSquareName,
      capture: capture
    };

  if (promotion) {
    move.promotion = promotion;
  }

  return move;
}

module.exports = parseMoveName;

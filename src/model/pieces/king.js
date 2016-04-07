'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils');

var offsets = [16, -16, 1, -1, 15, 17, -15, -17],
  castlingOffsets = [
    -2, // queen-side (long)
    2 // king-side (short)
  ];

module.exports = {
  token: 'k',

  forEachMove: function (callback) {
    var self = this,
      opponentColor = this.color.toggle(),
      chess = self.square.chess;

    offsets.forEach(function (offset) {
      var targetSquareIndex = self.square.index + offset,
        targetSquare, move;

      if (boardUtils.isSquareOutOfBoard(targetSquareIndex)) {
        return;
      }

      targetSquare = self.square.chess.squares[targetSquareIndex];

      if (targetSquare.isOccupiedByOpponent(self.color)) {
        move = self.createCapture(self.square, targetSquare);
      } else if (targetSquare.isEmpty()) {
        move = self.createMove(targetSquare);
      } else {
        return;
      }

      if (chess.isInCheckAfter(move)) {
        return;
      }

      if (targetSquare.isEmpty() ||
        targetSquare.isOccupiedByOpponent(self.color)) {
        callback.call(self, move);
      }
    });
  }
};

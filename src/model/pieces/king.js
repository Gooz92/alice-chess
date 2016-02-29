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
        targetSquare;

      if (boardUtils.isSquareOutOfBoard(targetSquareIndex)) {
        return;
      }

      targetSquare = self.square.chess.squares[targetSquareIndex];

      // targetSquare.getName() - performance
      if (chess.isSquareAttacked(targetSquare.getName(), opponentColor)) {
        return;
      }

      if (targetSquare.isEmpty() ||
        targetSquare.isOccupiedByOpponent(self.color)) {
        callback.call(self, self.createMove(targetSquare));
      }
    });
  }
};

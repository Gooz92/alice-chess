'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  offsets = [14, 18, 31, 33, -14, -18, -31, -33];

module.exports = {
  token: 'n',

  forEachMove: function (callback) {
    var self = this;

    offsets.forEach(function (offset) {
      var targetSquareIndex = self.square.index + offset,
        targetSquare, move;

      if (boardUtils.isSquareOutOfBoard(targetSquareIndex)) {
        return;
      }

      targetSquare = self.square.chess.squares[targetSquareIndex];
      move = self.createMove(targetSquare);

      if ((targetSquare.isEmpty() ||
        targetSquare.isOccupiedByOpponent(self.color)) &&
        !targetSquare.chess.isInCheckAfter(move)) {
        callback.call(self, move);
      }
    });
  }
};

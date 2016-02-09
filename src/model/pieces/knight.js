'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  offsets = [14, 18, 31, 33, -14, -18, -31, -33];

module.exports = {
  token: 'n',

  forEachTargetSquare: function (callback) {
    var self = this;

    offsets.forEach(function (offset) {
      var targetSquareIndex = self.square.index + offset,
        targetSquare;

      if (boardUtils.isSquareOutOfBoard(targetSquareIndex)) {
        return;
      }

      targetSquare = self.square.chess.squares[targetSquareIndex];

      if (targetSquare.isEmpty() ||
        targetSquare.isOccupiedByOpponent(self.color)) {
        callback.call(self, targetSquare);
      }
    });
  }
};

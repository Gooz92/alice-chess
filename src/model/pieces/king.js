'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils');

var offsets = [16, -16, 1, -1, 15, 17, -15, -17];

module.exports = {
  token: 'k',

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

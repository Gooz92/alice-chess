'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  moveFactory = require('../move-factory');

var offsets = [14, 18, 31, 33, -14, -18, -31, -33];

module.exports = {
  token: 'n',

  forEachMove: function (callback, pseuodoLegal) {
    var self = this;

    offsets.forEach(function (offset) {
      var targetSquareIndex = self.square.index + offset,
        targetSquare, move;

      if (boardUtils.isSquareOutOfBoard(targetSquareIndex)) {
        return;
      }

      targetSquare = self.square.chess.squares[targetSquareIndex];

      if (targetSquare.isEmpty()) {
        move = moveFactory.createSilentMove(self.square, targetSquare);
      } else if (targetSquare.isOccupiedByOpponent(self.color)) {
        move = moveFactory.createCapture(self.square, targetSquare);
      } else {
        return;
      }

      if (pseuodoLegal || !targetSquare.chess.isInCheckAfter(move)) {
        callback(move);
      }
    });
  }
};

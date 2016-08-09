'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  moveFactory = require('../move-factory');

module.exports = {
  token: 'r',
  offsets: [-1, 1, 16, -16],

  forEachMove: function (callback, pseudoLegal) {
    var self = this;

    this.offsets.forEach(function (offset) {
      var targetSquareIndex = self.square.index + offset,
        targetSquare, move;

      while (boardUtils.isSquareOnBoard(targetSquareIndex)) {
        targetSquare = self.square.chess.squares[targetSquareIndex];

        if (targetSquare.isOccupied()) {
          if (targetSquare.piece.color !== self.color) {
            move = moveFactory.createRookCapture(self.square, targetSquare);
            if (pseudoLegal || !targetSquare.chess.isInCheckAfter(move)) {
              callback.call(self, move);
            }
          }
          return;
        }

        move = moveFactory.createRookMove(self.square, targetSquare);

        if (pseudoLegal || !targetSquare.chess.isInCheckAfter(move)) {
          callback.call(self, move);
        }

        targetSquareIndex += offset;
      }

    });
  }
};

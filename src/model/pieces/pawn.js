'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  Move = require('../move');

var captureOffsets = [15, 17];

module.exports = {
  token: 'p',

  isOnStartPosition: function () {
    var rankIndex = this.square.getRankIndex(),
      startRankIndex = this.color.isWhite() ? 1 : 6;

    return rankIndex === startRankIndex;
  },

  forEachMove: function (callback, pseudoLegal) {
    this.forEachStep(callback, pseudoLegal);
    this.forEachCapture(callback, pseudoLegal);
  },

  forEachStep: function (callback, pseudoLegal) {
    var offset = this.color.isWhite() ? 16 : -16,
      targetSquareIndex = this.square.index,
      targetSquare, isFirstStep = false,
      move;

    do {
      targetSquareIndex += offset;
      targetSquare = this.square.chess.squares[targetSquareIndex];
      if (targetSquare.isEmpty()) {
        move = Move.create(this.square, targetSquare);
        if (pseudoLegal || !this.square.chess.isInCheckAfter(move)) {
          callback.call(this, move);
        }
        isFirstStep = !isFirstStep;
      } else {
        break;
      }
    } while (isFirstStep && this.isOnStartPosition());
  },

  forEachCapture: function (callback, pseudoLegal) {
    var offsets,
      self = this;

    if (this.color.isWhite()) {
      offsets = captureOffsets;
    } else {
      offsets = [
        -captureOffsets[0],
        -captureOffsets[1],
      ];
    }

    offsets.forEach(function (offset) {
      var targetSquareIndex = self.square.index + offset,
        targetSquare, move;

      if (boardUtils.isSquareOutOfBoard(targetSquareIndex)) {
        return;
      }

      targetSquare = self.square.chess.squares[targetSquareIndex];

      move = Move.create(self.square, targetSquare);

      if ((targetSquare.isOccupiedByOpponent(self.color) ||
        targetSquare === self.square.chess.enPassantTargetSquare) &&
        (pseudoLegal || !targetSquare.chess.isInCheckAfter(move))) {
        callback.call(self, move);
      }
    });
  }
};

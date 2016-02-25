'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils');

var captureOffsets = [15, 17];

module.exports = {
  token: 'p',

  isOnStartPosition: function () {
    var rankIndex = this.square.getRankIndex(),
      startRankIndex = this.color.isWhite() ? 1 : 6;

    return rankIndex === startRankIndex;
  },

  forEachTargetSquare: function (callback) {
    this.forEachStepSquare(callback);
    this.forEachCaptureSquare(callback);
  },

  forEachStepSquare: function (callback) {
    var offset = this.color.isWhite() ? 16 : -16,
      targetSquareIndex = this.square.index,
      targetSquare, isFirstStep = false,
      move;

    do {
      targetSquareIndex += offset;
      targetSquare = this.square.chess.squares[targetSquareIndex];
      if (targetSquare.isEmpty()) {
        move = this.createMove(targetSquare);
        if (!this.square.chess.isInCheckAfter(move)) {
          callback.call(this, targetSquare);
        }
        isFirstStep = !isFirstStep;
      } else {
        break;
      }
    } while (isFirstStep && this.isOnStartPosition());
  },

  forEachCaptureSquare: function (callback) {
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

      move = self.createMove(targetSquare);

      if ((targetSquare.isOccupiedByOpponent(self.color) ||
        targetSquare === self.square.chess.enPassantTargetSquare) &&
        !targetSquare.chess.isInCheckAfter(move)) {
        callback.call(self, targetSquare);
      }
    });
  }
};

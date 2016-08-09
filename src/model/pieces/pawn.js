'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  moveFactory = require('../move-factory');

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
      promotablePieces = (this.color.isBlack() ? 'rnbq' : 'RNBQ').split(''),
      self = this,
      move;

    do {
      targetSquareIndex += offset;
      targetSquare = this.square.chess.squares[targetSquareIndex];
      if (targetSquare.isEmpty()) {
        if (isFirstStep) {
          move = moveFactory.createBigPawnMove(this.square, targetSquare);
          if (pseudoLegal || !this.square.chess.isInCheckAfter(move)) {
            callback.call(this, move);
          }
        } else if (targetSquare.getRankIndex() === 0 ||
            targetSquare.getRankIndex() === 7) {
          promotablePieces.forEach(function (p) {
            var move = moveFactory.createPromotion(self.square, targetSquare, p);
            if (pseudoLegal || !self.square.chess.isInCheckAfter(move)) {
             callback.call(self, move);
            }
          });
        } else {
          move = moveFactory.createSilentMove(this.square, targetSquare);
          if (pseudoLegal || !this.square.chess.isInCheckAfter(move)) {
            callback.call(this, move);
          }
        }

        isFirstStep = !isFirstStep;
      } else {
        break;
      }
    } while (isFirstStep && this.isOnStartPosition());
  },

  forEachCapture: function (callback, pseudoLegal) {
    var offsets,
      self = this,
      promotablePieces = (this.color.isBlack() ? 'rnbq' : 'RNBQ').split('');

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

      if (targetSquare.isOccupiedByOpponent(self.color)) {
        if (targetSquare.getRankIndex() === 0 ||
            targetSquare.getRankIndex() === 7) {
          promotablePieces.forEach(function (p) {
            var move = moveFactory.createCapturePromotion(self.square, targetSquare, p);
            if (pseudoLegal || !self.square.chess.isInCheckAfter(move)) {
             callback.call(self, move);
            }
          });
        } else {
          move = moveFactory.createCapture(self.square, targetSquare);
           if (pseudoLegal || !targetSquare.chess.isInCheckAfter(move)) {
        callback.call(self, move);
      }
        }
      } else if (targetSquare.isTargetEnPassantSquare()) {
        move = moveFactory.createEnPassant(self.square, targetSquare);
        if (pseudoLegal || !targetSquare.chess.isInCheckAfter(move)) {
          callback.call(self, move);
        }
      } else {
        return;
      }
    });
  }
};

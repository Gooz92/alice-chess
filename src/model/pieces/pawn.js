'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  moveFactory = require('../move-factory');

var captureOffsets = [15, 17];

module.exports = {
  token: 'p',

  isOnStartPosition: function () {
    var startRankIndex = this.color.isWhite() ? 1 : 6;
    return this.square.rankIndex === startRankIndex;
  },

  forEachMove: function (callback, pseudoLegal) {
    this.forEachStep(callback, pseudoLegal);
    this.forEachCapture(callback, pseudoLegal);
  },

  forEachPromotion: function (callback, pseudoLegal, targetSquare) {
    var promotablePieces = (this.color.isBlack() ? 'qnbr' : 'QNBR').split(''),
      self = this,
      createPromotion,
      move, p, index;

    if (targetSquare.isOccupied()) {
      createPromotion = moveFactory.createCapturePromotion;
    } else {
      createPromotion = moveFactory.createPromotion;
    }

    for (index = 0; index < 4; index++) {
      p = promotablePieces[index];
      move = createPromotion(self.square, targetSquare, p);
      if (pseudoLegal || !self.square.chess.isInCheckAfter(move)) {
        callback.call(self, move);
      }
    }
  },

  // bad name / refactor
  enshureLegalMove: function (callback, move, pseudoLegal) {
    if (pseudoLegal || !this.square.chess.isInCheckAfter(move)) {
      callback.call(this, move);
    }
  },

  forEachStep: function (callback, pseudoLegal) {
    var offset = this.color.isWhite() ? 16 : -16,
      targetSquareIndex = this.square.index,
      isFirstStep = false,
      self = this,
      move, targetSquare;

    do {
      targetSquareIndex += offset;
      targetSquare = this.square.chess.squares[targetSquareIndex];

      if (targetSquare.isOccupied()) {
        break;
      }

      if (isFirstStep) {
        move = moveFactory.createBigPawnMove(this.square, targetSquare);
        this.enshureLegalMove(callback, move, pseudoLegal);
      } else if (targetSquare.rankIndex === 0 ||
          targetSquare.rankIndex === 7) {

        self.forEachPromotion(callback, pseudoLegal, targetSquare);
      } else {
        move = moveFactory.createSilentMove(this.square, targetSquare);
        this.enshureLegalMove(callback, move, pseudoLegal);
      }

      isFirstStep = !isFirstStep;
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

      if (targetSquare.isOccupiedByOpponent(self.color)) {
        if (targetSquare.rankIndex === 0 ||
            targetSquare.rankIndex === 7) {
         self.forEachPromotion(callback, pseudoLegal, targetSquare);
        } else {
          move = moveFactory.createCapture(self.square, targetSquare);
          self.enshureLegalMove(callback, move, pseudoLegal);
        }
      } else if ([2, 5][self.color.index] === targetSquare.rankIndex &&
                 targetSquare.isTargetEnPassantSquare()) {
        move = moveFactory.createEnPassant(self.square, targetSquare);
        self.enshureLegalMove(callback, move, pseudoLegal);
      } else {
        return;
      }
    });
  }
};

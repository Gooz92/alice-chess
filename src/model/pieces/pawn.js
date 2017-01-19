'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  moveFactory = require('../move-factory');

var captureOffsets = [
    [-15, -17],
    [15, 17]
  ],

  promotionPieces = [
    ['q', 'n', 'b', 'r'],
    ['Q', 'N', 'B', 'R']
  ],

  stepOffsets = [-16, 16];

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
    var promotablePieces = promotionPieces[this.color.index],
      createPromotion,
      move, p, index;

    if (targetSquare.isOccupied()) {
      createPromotion = moveFactory.createCapturePromotion;
    } else {
      createPromotion = moveFactory.createPromotion;
    }

    for (index = 0; index < 4; index++) {
      p = promotablePieces[index];
      move = createPromotion(this.square, targetSquare, p);
      if (pseudoLegal || !this.square.chess.isInCheckAfter(move)) {
        callback.call(this, move);
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
    var offset = stepOffsets[this.color.index],
      targetSquareIndex = this.square.index + offset,
      targetSquare = this.square.chess.squares[targetSquareIndex],
      move;

    if (targetSquare.isOccupied()) {
      return;
    }

    if (targetSquare.rankIndex !== 0 && targetSquare.rankIndex !== 7) {
      move = moveFactory.createSilentMove(this.square, targetSquare);
      this.enshureLegalMove(callback, move, pseudoLegal);
    } else {
      this.forEachPromotion(callback, pseudoLegal, targetSquare);
    }

    targetSquare = this.square.chess.squares[targetSquareIndex + offset];

    if (!this.isOnStartPosition() || targetSquare.isOccupied()) {
      return;
    }

    move = moveFactory.createBigPawnMove(this.square, targetSquare);
    this.enshureLegalMove(callback, move, pseudoLegal);
  },

  capture: function (callback, pseudoLegal, offset) {
    var targetSquareIndex = this.square.index + offset,
      targetSquare, move;

    if (boardUtils.isSquareOutOfBoard(targetSquareIndex)) {
      return;
    }

    targetSquare = this.square.chess.squares[targetSquareIndex];

    if (targetSquare.isOccupiedByOpponent(this.color)) {
      if (targetSquare.rankIndex === 0 ||
          targetSquare.rankIndex === 7) {
        this.forEachPromotion(callback, pseudoLegal, targetSquare);
      } else {
        move = moveFactory.createCapture(this.square, targetSquare);
        this.enshureLegalMove(callback, move, pseudoLegal);
      }
    } else if ([2, 5][this.color.index] === targetSquare.rankIndex &&
                targetSquare.isTargetEnPassantSquare()) {
      move = moveFactory.createEnPassant(this.square, targetSquare);
      this.enshureLegalMove(callback, move, pseudoLegal);
    }
  },

  forEachCapture: function (callback, pseudoLegal) {
    var offsets = captureOffsets[this.color.index];

    this.capture(callback, pseudoLegal, offsets[0]);
    this.capture(callback, pseudoLegal, offsets[1]);
  }
};

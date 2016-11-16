'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  moveFactory = require('../move-factory'),
  arrayUtils = require('../../utils/common-utils/array-utils');

var offsets = [16, -16, 1, -1, 15, 17, -15, -17];

module.exports = {
  token: 'k',

  isQsideCastlingAvalible: function () {
    var squareIndex = this.square.index,
      square = this.square.chess.squares[squareIndex - 1];

    if (square.isOccupied() ||
      square.chess.isSquareAttacked(square.index, this.color.toggle())) {
      return false;
    }

    square = square.chess.squares[squareIndex - 2];

    if (square.isOccupied() ||
      square.chess.isSquareAttacked(square.index, this.color.toggle())) {
      return false;
    }

    square = square.chess.squares[squareIndex - 3];

    if (square.isOccupied()) {
      return false;
    }

    return true;
  },

  isKsideCaslingAvailable: function () {
    var squareIndex = this.square.index,
      square = this.square.chess.squares[squareIndex + 1];

    if (square.isOccupied() ||
      square.chess.isSquareAttacked(square.index, this.color.toggle())) {
      return false;
    }

    square = square.chess.squares[squareIndex + 2];

    if (square.isOccupied() ||
      square.chess.isSquareAttacked(square.index, this.color.toggle())) {
      return false;
    }

    return true;
  },

  isOnStartPosition: function () {
    return this.square.name === (this.color.isWhite() ? 'e1' : 'e8');
  },

  forEachMove: function (callback, pseudoLegal) {
    var self = this,
      opponentColor = this.color.toggle(),
      chess = self.square.chess;

    offsets.forEach(function (offset) {
      var targetSquareIndex = self.square.index + offset,
        targetSquare, move;

      if (boardUtils.isSquareOutOfBoard(targetSquareIndex)) {
        return;
      }

      targetSquare = self.square.chess.squares[targetSquareIndex];

      if (targetSquare.isOccupiedByOpponent(self.color)) {
        move = moveFactory.createKingCapture(self.square, targetSquare);
      } else if (targetSquare.isEmpty()) {
        move = moveFactory.createKingMove(self.square, targetSquare);
      } else {
        return;
      }

      if (chess.isInCheckAfter(move)) {
        return;
      }

      if (targetSquare.isEmpty() ||
        targetSquare.isOccupiedByOpponent(self.color)) {
        callback.call(self, move);
      }
    });

    if (chess.isInCheck()) {
      return;
    }

    var castlingRights = chess.castlingRights,
      castling;

    if (self.color.isWhite()) {
      castlingRights >>= 2;
    } else {
      castlingRights &= 3;
    }

    if ((castlingRights & 2) === 2 &&
      this.isKsideCaslingAvailable() &&
      chess.squares[this.square.index + 3].isOccupied() &&
      chess.squares[this.square.index + 3].piece.isRook()) {
      castling = moveFactory.createShortCastling(this,
        chess.squares[this.square.index + 3].piece);
      callback.call(self, castling);
    }

    if ((castlingRights & 1) === 1 &&
      this.isQsideCastlingAvalible() &&
      chess.squares[this.square.index - 4].isOccupied() &&
      chess.squares[this.square.index - 4].piece.isRook()) {
      castling = moveFactory.createLongCastling(this,
        chess.squares[this.square.index - 4].piece);
      callback.call(self, castling);
    }
  }
};

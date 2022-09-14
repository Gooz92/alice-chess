'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  moveFactory = require('../move-factory'),
  castlingRightsUtils = require('../../utils/chess-utils/castling-rights-utils');

var offsets = [16, -16, 1, -1, 15, 17, -15, -17],
  extractSideCastlingRights = castlingRightsUtils.extractSideCastlingRights;

module.exports = {
  token: 'k',

  isQsideCastlingAvalible: function () {
    var squareIndex = this.square.index,
      square = this.square.chess.squares[squareIndex - 1],
      opponentColor = this.color.toggle();

    if (square.isOccupied() ||
      square.chess.isSquareAttacked(square.index, opponentColor)) {
      return false;
    }

    square = square.chess.squares[squareIndex - 2];

    if (square.isOccupied() ||
      square.chess.isSquareAttacked(square.index, opponentColor)) {
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
      square = this.square.chess.squares[squareIndex + 1],
      opponentColor = this.color.toggle();

    if (square.isOccupied() ||
      square.chess.isSquareAttacked(square.index, opponentColor)) {
      return false;
    }

    square = square.chess.squares[squareIndex + 2];

    if (square.isOccupied() ||
      square.chess.isSquareAttacked(square.index, opponentColor)) {
      return false;
    }

    return true;
  },

  isOnStartPosition: function () {
    return this.square.index === [116, 4][this.color.index];
  },

  forEachCastlings: function (callback) {
    var chess = this.square.chess,
      castlingRights = extractSideCastlingRights(
        chess.castlingRights, this.color.index
      ),
      targetSquare, castling;
    
    targetSquare = chess.squares[this.square.index + 3];

    if ((castlingRights & 2) === 2 &&
      this.isKsideCaslingAvailable() &&
      targetSquare.isOccupied() &&
      targetSquare.piece.isRook()) {
      castling = moveFactory.createShortCastling(this, targetSquare.piece);
      callback(castling);
    }

    targetSquare = chess.squares[this.square.index - 4];

    if ((castlingRights & 1) === 1 &&
      this.isQsideCastlingAvalible() &&
      targetSquare.isOccupied() &&
      targetSquare.piece.isRook()) {
      castling = moveFactory.createLongCastling(this, targetSquare.piece);
      callback(castling);
    }
  },

  forEachMove: function (callback, pseudoLegal) {
    var self = this,
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

      if (!pseudoLegal && chess.isInCheckAfter(move)) {
        return;
      }

      if (targetSquare.isEmpty() ||
        targetSquare.isOccupiedByOpponent(self.color)) {
        callback(move);
      }
    });

    if (chess.isInCheck()) {
      return;
    }

    this.forEachCastlings(callback);
  }
};

'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  Move = require('../move'),
  squares = require('../../utils/chess-utils/squares');

var offsets = [16, -16, 1, -1, 15, 17, -15, -17];

module.exports = {
  token: 'k',

  createShortCastlingMove: function () {
    var self = this,
      rookSquareIndex = this.color.isWhite() ? squares.h1 : squares.h8,
      rook = this.square.chess.squares[rookSquareIndex].piece,
      rookTargetSquare = this.square.chess.squares[rookSquareIndex - 2],
      kingTargetSquare = this.square.chess.squares[this.square.index + 2];

    return {
      make: function () {
        self.moveTo(kingTargetSquare);
        rook.moveTo(rookTargetSquare);
      }
    };
  },

  createLongCastlingMove: function () {
    var self = this,
      rookSquareIndex = this.color.isWhite() ? squares.a1 : squares.a8,
      rook = this.square.chess.squares[rookSquareIndex].piece,
      rookTargetSquare = this.square.chess.squares[rookSquareIndex + 3],
      kingTargetSquare = this.square.chess.squares[this.square.index - 2];

    return {
      make: function () {
        self.moveTo(kingTargetSquare);
        rook.moveTo(rookTargetSquare);
      }
    };
  },

  forEachMove: function (callback) {
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
        move = Move.createCapture(self.square, targetSquare);
      } else if (targetSquare.isEmpty()) {
        move = self.createMove(targetSquare);
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
  }
};

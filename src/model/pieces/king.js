'use strict';

var boardUtils = require('../../utils/chess-utils/board-utils'),
  Move = require('../move'),
  squares = require('../../utils/chess-utils/squares'),
  arrayUtils = require('../../utils/common-utils/array-utils');

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
        self.square.chess.history.push(this);
      },

      unMake: function () {
        self.moveTo(self.square.chess.squares[squares.e1]);
        rook.moveTo(self.square.chess.squares[squares.h1]);
        arrayUtils.remove(self.square.chess.history, this);
      },

      toSAN: function () {
        return 'O-O';
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

  isKsideCaslingAvailable: function () {
    var self = this, squares, rookSquare;

    if (this.color.isWhite()) {
      squares = [
        this.square.chess.getSquareByName('f1'),
        this.square.chess.getSquareByName('g1')
      ];
      rookSquare = self.square.chess.getSquareByName('h1');
    } else {
      squares = [
        this.square.chess.getSquareByName('f8'),
        this.square.chess.getSquareByName('g8')
      ];
      rookSquare = self.square.chess.getSquareByName('h8');
    }

    return rookSquare.isOccupied() && squares.every(function (square) {
      return (square.isEmpty() &&
        !square.chess.isSquareAttacked(square.name, self.color.toggle()));
    });
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

    if (this.square.name === 'e1' && chess.castlingAvalibility[2 * this.color.index] && this.isKsideCaslingAvailable()) {
      callback.call(self, this.createShortCastlingMove());
    }
  }
};

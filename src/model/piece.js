'use strict';

var objectUtils = require('../utils/common-utils/object-utils'),
  boardUtils = require('../utils/chess-utils/board-utils'),
  Color = require('./color'),
  Move = require('./move'),
  pieces = require('./pieces'),
  arrayUtils = require('../utils/common-utils/array-utils'),
  isPieceMixin = require('./is-piece-mixin');

function createPieceConstructors(pieces) {
  return objectUtils.map(pieces, function (piecePrototype) {
    var PieceConstructor = objectUtils.inherit(function () {
      this.super.constructor.apply(this, arguments);
    }, Piece);

    objectUtils.extend(PieceConstructor.prototype, piecePrototype);

    return PieceConstructor;
  });
}

var constructors = createPieceConstructors(pieces);

function Piece(color, square) {
  this.color = color;
  this.square = square;

  square.piece = this;
}

Piece.create = function (fenToken, square) {
  var pieceToken = fenToken.toLowerCase(),
    color = Color.getByFlag(pieceToken !== fenToken),
    PieceConstructor = constructors[pieceToken];

  return new PieceConstructor(color, square);
};

var piecePrototype = {
  getFenToken: function () {
    var fenToken = this.token;

    if (this.color.isWhite()) {
      fenToken = fenToken.toUpperCase();
    }

    return fenToken;
  },

  moveTo: function (square) {
    delete this.square.piece;
    this.square = square;
    square.piece = this;
  },

  /*
   * This implemetation use by rook, bishop and queen.
   * For pawn, knight and king used implementation placed in corresonding module
   */
  forEachTargetSquare: function (callback) {
    var self = this;

    this.offsets.forEach(function (offset) {
      var targetSquareIndex = self.square.index + offset,
        targetSquare;

      while (boardUtils.isSquareOnBoard(targetSquareIndex)) {
        targetSquare = self.square.chess.squares[targetSquareIndex];

        if (targetSquare.isOccupied()) {
          if (targetSquare.piece.color !== self.color) {
            callback.call(self, targetSquare);
          }
          return;
        }

        callback.call(self, targetSquare);
        targetSquareIndex += offset;
      }

    });
  },

  forEachTargetSquareName: function (callback) {
    this.forEachTargetSquare(function (targetSquare) {
      var targetSquareName = targetSquare.getName();
      callback.call(this, targetSquareName);
    });
  },

  calculateMoveCount: function () {
    var moveCount = 0;

    this.forEachTargetSquare(function () {
      ++moveCount;
    });

    return moveCount;
  },

  mapTargetSquares: function (callback) {
    var results = [];

    this.forEachTargetSquare(function (targetSquare) {
      var result = callback.call(this, targetSquare);
      results.push(result);
    });

    return results;
  },

  generateTargetSquareNames: function () {
    return this.mapTargetSquares(function (square) {
      return square.getName();
    });
  },

  generateMoves: function () {
    return this.mapTargetSquares(function (square) {
      return this.createMove(square);
    });
  },

  generateSanMoves: function () {
    return this.mapTargetSquares(function (targetSquare) {
      var move = this.createMove(targetSquare);
      return move.toSAN();
    });
  },

  move: function (squareName) {
    var square = this.square.chess.getSquareByName(squareName),
      move = this.createMove(square);

    move.execute();
  },

  createMove: function (targetSquare) {
    return new Move(this, targetSquare);
  },

  remove: function () {
    var playerPieces = this.square.chess.pieces[this.color.name];

    delete this.square.piece;

    // TODO throw error if piece already removed ?
    arrayUtils.remove(playerPieces, this);
  }
};

objectUtils.extend(Piece.prototype, piecePrototype, isPieceMixin);

module.exports = Piece;

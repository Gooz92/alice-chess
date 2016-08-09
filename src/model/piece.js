'use strict';

var objectUtils = require('../utils/common-utils/object-utils'),
  boardUtils = require('../utils/chess-utils/board-utils'),
  Color = require('./color'),
  moveFactory = require('./move-factory'),
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
  forEachMove: function (callback, pseudoLegal) {
    var self = this;

    this.offsets.forEach(function (offset) {
      var targetSquareIndex = self.square.index + offset,
        targetSquare, move;

      while (boardUtils.isSquareOnBoard(targetSquareIndex)) {
        targetSquare = self.square.chess.squares[targetSquareIndex];

        if (targetSquare.isOccupied()) {
          if (targetSquare.piece.color !== self.color) {
            move = moveFactory.createCapture(self.square, targetSquare);
            if (pseudoLegal || !targetSquare.chess.isInCheckAfter(move)) {
              callback.call(self, move);
            }
          }
          return;
        }

        move = moveFactory.createSilentMove(self.square, targetSquare);

        if (pseudoLegal || !targetSquare.chess.isInCheckAfter(move)) {
          callback.call(self, move);
        }

        targetSquareIndex += offset;
      }

    });
  },

  forEachTargetSquareName: function (callback) {
    this.forEachMovee(function (move) {
      var targetSquareName = move.targetSquare.name;
      callback.call(this, targetSquareName);
    });
  },

  calculateMoveCount: function () {
    var moveCount = 0;

    this.forEachMove(function () {
      ++moveCount;
    });

    return moveCount;
  },

  mapTargetSquares: function (callback) {
    var results = [];

    this.forEachMove(function (move) {
      var result = callback.call(this, move.targetSquare);
      results.push(result);
    });

    return results;
  },

  generateTargetSquareNames: function () {
    return this.mapTargetSquares(function (square) {
      return square.name;
    });
  },

  generateMoves: function (pseudoLegal) {
    var moves = [];

    this.forEachMove(function (move) {
      moves.push(move);
    }, pseudoLegal);

    return moves;
  },

  generateSanMoves: function () {
    var moveNames = [];

    this.forEachMove(function (move) {
      moveNames.push(move.toSAN());
    });

    return moveNames;
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

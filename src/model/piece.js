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
    var PieceConstructor = function () {
      this.super.constructor.apply(this, arguments);
    };

    PieceConstructor.prototype = Object.create(Piece.prototype);
    PieceConstructor.prototype.super = Piece.prototype;

    objectUtils.extend(PieceConstructor.prototype, piecePrototype);

    return PieceConstructor;
  });
}

var constructors = createPieceConstructors(pieces);

function Piece(color, square, fenToken) {
  this.color = color;
  this.square = square;
  this.fenToken = fenToken;

  square.piece = this;
}

Piece.create = function (fenToken, square) {
  var pieceToken = fenToken.toLowerCase(),
    color = Color.getByFlag(pieceToken !== fenToken),
    PieceConstructor = constructors[pieceToken];

  return new PieceConstructor(color, square, fenToken);
};

var piecePrototype = {

  moveTo: function (square) {
    this.square.piece = null;
    this.square = square;
    square.piece = this;
  },

  /*
   * This implemetation use by rook, bishop and queen.
   * For pawn, knight and king used implementation placed in corresonding module
   */
  forEachMove: function (callback, pseudoLegal) {
    var targetSquareIndex, targetSquare, move, index, offset;

    for (index = 0; index < this.offsets.length; index++) {
      offset = this.offsets[index];
      targetSquareIndex = this.square.index;

      while (boardUtils.isSquareOnBoard(targetSquareIndex += offset)) {
        targetSquare = this.square.chess.squares[targetSquareIndex];

        if (targetSquare.isOccupied()) {
          if (targetSquare.piece.color !== this.color) {
            move = moveFactory.createCapture(this.square, targetSquare);
            if (pseudoLegal || !targetSquare.chess.isInCheckAfter(move)) {
              callback(move);
            }
          }
          break;
        }

        move = moveFactory.createSilentMove(this.square, targetSquare);

        if (pseudoLegal || !targetSquare.chess.isInCheckAfter(move)) {
          callback(move);
        }
      }
    }
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
      var result = callback(move.targetSquare);
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
    var playerPieces = this.square.chess.pieces[this.color.index];

    this.square.piece = null;

    // TODO throw error if piece already removed ?
    arrayUtils.remove(playerPieces, this);
  }
};

objectUtils.extend(Piece.prototype, piecePrototype, isPieceMixin);

module.exports = Piece;

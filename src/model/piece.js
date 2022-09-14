const objectUtils = require('../utils/common-utils/object-utils'),
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

const constructors = createPieceConstructors(pieces);

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

const piecePrototype = {

  moveTo: function (square) {
    this.square.piece = null;
    this.square = square;
    square.piece = this;
  },

  /*
   * This implementation use by rook, bishop and queen.
   * For pawn, knight and king used implementation placed in corresponding module
   */
  forEachMove: function (callback, pseudoLegal) {

    for (let index = 0; index < this.offsets.length; index++) {
      const offset = this.offsets[index];
      let targetSquareIndex = this.square.index;

      while (boardUtils.isSquareOnBoard(targetSquareIndex += offset)) {
        const targetSquare = this.square.chess.squares[targetSquareIndex];

        if (targetSquare.isOccupied()) {
          if (targetSquare.piece.color !== this.color) {
            const move = moveFactory.createCapture(this.square, targetSquare);
            if (pseudoLegal || !targetSquare.chess.isInCheckAfter(move)) {
              callback(move);
            }
          }
          break;
        }

        const move = moveFactory.createSilentMove(this.square, targetSquare);

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

  mapTargetSquares: function (callback, pseudoLegal) {
    const results = [];

    this.forEachMove(move => {
      const result = callback(move.targetSquare);
      results.push(result);
    }, pseudoLegal);

    return results;
  },

  generateTargetSquareNames(pseudoLegal = false) {
    return this.mapTargetSquares(square => square.name, pseudoLegal);
  },

  generateMoves: function (pseudoLegal) {
    const moves = [];

    this.forEachMove(move => {
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

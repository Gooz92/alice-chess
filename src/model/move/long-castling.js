'use strict';

var arrayUtils = require('../../utils/common-utils/array-utils');

function LongCastling(king, rook) {
  this.king = king;
  this.rook = rook;
}

LongCastling.prototype = {
  constructor: LongCastling,

  make: function () {
    var chess = this.king.square.chess,

      targetRookSquare = chess.squares[this.rook.square.index + 3],
      targetKingSquare = chess.squares[this.king.square.index - 2];

    this.sourceRookSquare = this.rook.square;
    this.sourceKingSquare = this.king.square;

    this.previousCastlingRights = chess.castlingRights;

    this.king.moveTo(targetKingSquare);
    this.rook.moveTo(targetRookSquare);

    chess.castlingRights &= 12 >> this.king.color.index * 2;
  },

   unMake: function () {
    this.king.moveTo(this.sourceKingSquare);
    this.rook.moveTo(this.sourceRookSquare);

    this.king.square.chess.castlingRights = this.previousCastlingRights;
    this.king.square.chess.turn();
    arrayUtils.remove(this.king.square.chess.history, this);
  },

  toSAN: function () {
    return 'O-O-O';
  }
};

module.exports = LongCastling;

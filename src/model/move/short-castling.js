'use strict';

var arrayUtils = require('../../utils/common-utils/array-utils');

function ShortCastling(king, rook) {
  this.king = king;
  this.rook = rook;
}

ShortCastling.prototype = {
  constructor: ShortCastling,

  make: function () {
    var chess = this.king.square.chess,

      targetRookSquare = chess.squares[this.rook.square.index - 2],
      targetKingSquare = chess.squares[this.king.square.index + 2];

    this.sourceRookSquare = this.rook.square;
    this.sourceKingSquare = this.king.square;

    this.previousCastlingRights = chess.castlingRights;

    this.king.moveTo(targetKingSquare);
    this.rook.moveTo(targetRookSquare);

    chess.castlingRights &= 12 >> this.king.color.index * 2;

    chess.turn();
    chess.history.push(this);
  },

  unMake: function () {
    var chess = this.king.square.chess;

    this.king.moveTo(this.sourceKingSquare);
    this.rook.moveTo(this.sourceRookSquare);

    chess.castlingRights = this.previousCastlingRights;
    chess.turn();

    arrayUtils.remove(chess.history, this);
  },

  toSAN: function () {
    return 'O-O';
  }
};

module.exports = ShortCastling;

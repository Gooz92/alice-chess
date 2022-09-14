'use strict';

function LongCastling(king, rook) {
  this.sourceSquare = king.square;
  this.king = king;
  this.rook = rook;
  this.piece = king;
  this.targetSquare = king.square.chess.squares[this.rook.square.index + 2];
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

    this.previousEnPassantTargetSquare = chess.enPassantTargetSquare;
    chess.enPassantTargetSquare = null;

    chess.turn();
    
    this.previousMove = chess.previousMove;
    chess.previousMove = this;
  },

   unMake: function () {
    var chess = this.king.square.chess;

    this.king.moveTo(this.sourceKingSquare);
    this.rook.moveTo(this.sourceRookSquare);

    chess.castlingRights = this.previousCastlingRights;
    chess.turn();

    chess.enPassantTargetSquare = this.previousEnPassantTargetSquare;

    chess.previousMove = this.previousMove;
  },

  toSAN: function () {
    return 'O-O-O';
  }
};

module.exports = LongCastling;

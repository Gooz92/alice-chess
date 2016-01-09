'use strict';

// TODO castling, pawn promotions !!!!

function Move(piece, targetSquare) {
  this.piece = piece;
  this.targetSquare = targetSquare;
}

Move.prototype = {
  constructor: Move,
  execute: function () {
    this.updateEnPassantSquareIndex();

    if (this.isCapture()) {
      this.targetSquare.piece.remove();
    }

    if (this.isEnPassant()) {
      this.targetSquare.chess.enPassantPawn.remove();
    }

    delete this.piece.square.piece;

    this.targetSquare.piece = this.piece;
    this.piece.square = this.targetSquare;

    this.targetSquare.chess.turn();
  },

  isPawnBigMove: function () {
    var sourceRankIndex = this.piece.square.getRankIndex(),
      destinationRankIndex = this.targetSquare.getRankIndex(),
      rankDistance = Math.abs(sourceRankIndex - destinationRankIndex);

    return this.piece.isPawn() && rankDistance === 2;
  },

  updateEnPassantSquareIndex: function () {
    var chess = this.targetSquare.chess,
      offset;

    if (!this.isPawnBigMove()) {
      delete chess.enPassantSquareIndex;
      return;
    }

    offset = this.piece.color.isWhite() ? -16 : 16;
    chess.enPassantSquareIndex = this.targetSquare.index + offset;
    // TODO ???
    chess.enPassantPawn = this.piece;
  },

  isCapture: function () {
    return this.targetSquare.isOccupiedByOpponent(this.piece.color);
  },

  isEnPassant: function () {
    var sourceFileIndex, destinationFileIndex;

    if (!this.piece.isPawn() || this.targetSquare.isOccupied()) {
      return false;
    }

    sourceFileIndex = this.piece.square.getFileIndex();
    destinationFileIndex = this.targetSquare.getFileIndex();

    return sourceFileIndex !== destinationFileIndex;
  },

  toSAN: function () {
    var san = this.targetSquare.getName();

    if (!this.piece.isPawn()) {
      san = this.piece.token.toUpperCase() + san;
    }

    return san;
  },

  toLongSAN: function () {
    var sourceSquareName = this.piece.square.getName(),
      destinationSquareName = this.targetSquare.getName();

    return sourceSquareName + '-' + destinationSquareName;
  }
};

module.exports = Move;

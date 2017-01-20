'use strict';

var Move = require('./move');

function EnPassant(sourceSquare, targetSquare) {
  Move.call(this, sourceSquare, targetSquare);
  this.capturedPawn = this.getCapturedPawn();
}

EnPassant.prototype.getCapturedPawn = function () {
  var chess = this.targetSquare.chess,
    squareIndexOffset = this.sourceSquare.piece.color.isWhite() ? -16 : 16,
    capturedPawnSquareIndex = this.targetSquare.index + squareIndexOffset,
    capturedPawn = chess.squares[capturedPawnSquareIndex].piece;

  return capturedPawn;
};

EnPassant.prototype.make = function () {
  this.capturedPawn.remove();
  Move.make(this);
};

EnPassant.prototype.unMake = function () {
  var chess = this.targetSquare.chess;

  Move.unMake(this);

  var squareIndexOffset = this.sourceSquare.piece.color.isWhite() ? -16 : 16,
    capturedPawnSquareIndex = this.targetSquare.index + squareIndexOffset;

  this.capturedPawn.square = chess.squares[capturedPawnSquareIndex];
  this.capturedPawn.square.piece = this.capturedPawn;
  chess.pieces[this.capturedPawn.color.index].push(this.capturedPawn);
};

EnPassant.prototype.toSAN = function () {
  return this.sourceSquare.fileName + 'x' + this.targetSquare.name;
};

module.exports = EnPassant;

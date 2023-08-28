'use strict';

const Move = require('./move');

class EnPassant extends Move {
  constructor(sourceSquare, targetSquare) {
    super(sourceSquare, targetSquare);
    this.capturedPawn = this.getCapturedPawn();
  }

  getCapturedPawn() {
    const chess = this.targetSquare.chess,
      squareIndexOffset = this.sourceSquare.piece.color.isWhite() ? -16 : 16,
      capturedPawnSquareIndex = this.targetSquare.index + squareIndexOffset,
      capturedPawn = chess.squares[capturedPawnSquareIndex].piece;
  
    return capturedPawn;
  }

  make() {
    this.capturedPawn.remove();
    Move.make(this);
  }

  unMake() {
    const chess = this.targetSquare.chess;
  
    Move.unMake(this);
  
    const squareIndexOffset = this.sourceSquare.piece.color.isWhite() ? -16 : 16,
      capturedPawnSquareIndex = this.targetSquare.index + squareIndexOffset;
  
    this.capturedPawn.square = chess.squares[capturedPawnSquareIndex];
    this.capturedPawn.square.piece = this.capturedPawn;
    chess.pieces[this.capturedPawn.color.index].push(this.capturedPawn);
  }

  toSAN() {
    return this.sourceSquare.fileName + 'x' + this.targetSquare.name;
  }
}

module.exports = EnPassant;

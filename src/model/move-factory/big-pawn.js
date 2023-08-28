const Move = require('./move');

class BigPawn extends Move {
  make() {
    const chess = this.targetSquare.chess,
      squareIndexOffset = this.piece.color.isWhite() ? -16 : 16,
      epTargetSquareIndex = this.targetSquare.index + squareIndexOffset,
      epTargetSquare = chess.squares[epTargetSquareIndex];
  
    Move.make(this);
  
    chess.enPassantTargetSquare = epTargetSquare;
  }
}

module.exports = BigPawn;

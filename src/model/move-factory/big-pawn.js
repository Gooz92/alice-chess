const Move = require('./move');

function BigPawn(sourceSquare, targetSquare) {
  Move.call(this, sourceSquare, targetSquare);
}

BigPawn.prototype = Object.create(Move.prototype);

BigPawn.prototype.make = function () {
  const chess = this.targetSquare.chess,
    squareIndexOffset = this.piece.color.isWhite() ? -16 : 16,
    epTargetSquareIndex = this.targetSquare.index + squareIndexOffset,
    epTargetSquare = chess.squares[epTargetSquareIndex];

  Move.make(this);

  chess.enPassantTargetSquare = epTargetSquare;
};

module.exports = BigPawn;

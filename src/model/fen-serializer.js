module.exports = class FenSerializer {
  constructor(chess) {
    this.chess = chess;
  }

  generateFenRank(rankIndex) {
    let rank = '',
      squareIndex = rankIndex * 16,
      endSquareIndex = squareIndex + 8,
      emptySquaresCount = 0;

    while (squareIndex < endSquareIndex) {
      const square = this.chess.squares[squareIndex];

      if (square.isEmpty()) {
        ++emptySquaresCount;
      } else {
        if (emptySquaresCount > 0) {
          rank += emptySquaresCount;
          emptySquaresCount = 0;
        }
        rank += square.piece.fenToken;
      }

      ++squareIndex;
    }

    if (emptySquaresCount > 0) {
      rank += emptySquaresCount;
    }

    return rank;
  }

  generatePiecePlacement() {
    const piecePlacement = [];

    for (let rankIndex = 7; rankIndex >= 0; rankIndex--) {
      const rank = this.generateFenRank(rankIndex);
      piecePlacement.push(rank);
    }

    return piecePlacement.join('/');
  }

  generateEnPassantTargetSquare() {
    if (this.chess.enPassantTargetSquare) {
      return this.chess.enPassantTargetSquare.name;
    }

    return '-';
  }

  generateHalfmoveClock() {
    var clock = 0, history = this.chess.getHistory(), move, index;

    for (index = history.length - 1; index >= 0; index--) {
      move = history[index];

      if (!move.piece.isPawn() && !move.capturedPiece) {
        ++clock;
      }
    }

    return clock;
  }

  generateFullmoveNumber() {
    return Math.ceil((this.chess.getHistory().length + 1) / 2);
  }

  generateFen() {
    return [
      this.generatePiecePlacement(),
      this.chess.activeColor.token,
      this.chess.generateFenCastlingRights(),
      this.generateEnPassantTargetSquare(),
      this.generateHalfmoveClock(),
      this.generateFullmoveNumber()
    ].join(' ');
  }
}

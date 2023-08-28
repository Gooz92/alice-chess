'use strict';

const Move = require('./move');

class RookMove extends Move {
  make() {
    const chess = this.targetSquare.chess,
      castlingRightsIndex = this.sourceSquare.fileIndex;

    this.previousCastlingRights = chess.castlingRights;

    if (castlingRightsIndex === 7) {
      const mask = this.sourceSquare.piece.color.isWhite() ? 7 : 13;
      chess.castlingRights &= mask;
    } else if (castlingRightsIndex === 0) {
      const mask = this.sourceSquare.piece.color.isWhite() ? 11 : 14;
      chess.castlingRights &= mask;
    }

    Move.make(this);
  }

  unMake() {
    this.targetSquare.chess.castlingRights = this.previousCastlingRights;
    Move.unMake(this);
  }

  toSAN() {
    return 'R' + Move.prototype.getSanDisambiguation.call(this) +
      this.targetSquare.name;
  }
}

module.exports = RookMove;

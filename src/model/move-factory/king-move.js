'use strict';

const Move = require('./move');

class KingMove extends Move {
  make() {
    const castlingRightsUpdateMask = 12 >> this.piece.color.index * 2,
      chess = this.targetSquare.chess;

    this.previousCastlingRigths = chess.castlingRights;

    Move.make(this);

    chess.castlingRights &= castlingRightsUpdateMask;
  }

  unMake() {
    this.targetSquare.chess.castlingRights = this.previousCastlingRigths;
    Move.unMake(this);
  }

  toSAN() {
    return 'K' + this.targetSquare.name;
  }
}

module.exports = KingMove;

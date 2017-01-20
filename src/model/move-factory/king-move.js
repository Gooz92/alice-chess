'use strict';

var Move = require('./move');

function KingMove(sourceSquare, targetSquare) {
  Move.call(this, sourceSquare, targetSquare);
}

KingMove.prototype = {
  constructor: KingMove,

  make: function () {
    var castlingRightsUpdateMask = 12 >> this.piece.color.index * 2,
      chess = this.targetSquare.chess;

    this.previousCastlingRigths = chess.castlingRights;

    Move.make(this);

    chess.castlingRights &= castlingRightsUpdateMask;
  },

  unMake: function () {
    this.targetSquare.chess.castlingRights = this.previousCastlingRigths;
    Move.unMake(this);
  },

  toSAN: function () {
    return 'K' + this.targetSquare.name;
  }
};

module.exports = KingMove;

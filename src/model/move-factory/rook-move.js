'use strict';

var Move = require('./move');

function RookMove(sourceSquare, targetSquare) {
  Move.call(this, sourceSquare, targetSquare);
}

RookMove.prototype = {
  constructor: RookMove,

  make: function () {
    var chess = this.targetSquare.chess,
      castlingRightsIndex = this.sourceSquare.fileIndex,
      mask;

    this.previousCastlingRights = chess.castlingRights;

    if (castlingRightsIndex === 7) {
      mask = this.sourceSquare.piece.color.isWhite() ? 7 : 13;
      chess.castlingRights &= mask;
    } else if (castlingRightsIndex === 0) {
      mask = this.sourceSquare.piece.color.isWhite() ? 11 : 14;
      chess.castlingRights &= mask;
    }

    Move.prototype.make.call(this);
  },

  unMake: function () {
    this.targetSquare.chess.castlingRights = this.previousCastlingRights;
    Move.prototype.unMake.call(this);
  },

  toSAN: function () {
    return 'R' + Move.prototype.getSanDisambiguation.call(this) +
      this.targetSquare.name;
  }
};

module.exports = RookMove;

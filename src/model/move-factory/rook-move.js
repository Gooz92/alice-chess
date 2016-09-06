'use strict';

var Move = require('./move');

function RookMove(sourceSquare, targetSquare) {
  Move.call(this, sourceSquare, targetSquare);
}

RookMove.prototype = {
  constructor: RookMove,

  make: function () {
    var chess = this.targetSquare.chess,
      castlingRightsIndex = this.sourceSquare.fileIndex;

    if (castlingRightsIndex === 7) {
      castlingRightsIndex = 1;
    }

    castlingRightsIndex += 2 * this.sourceSquare.piece.color.index;

    this.previousCastlingRights = chess.castlingRights;
    chess.castlingRights &= (15 ^ (1 << castlingRightsIndex));

    Move.prototype.make.call(this);
  },

  unMake: function () {
    this.targetSquare.chess.castlingRights = this.previousCastlingRights;
    Move.prototype.unMake.call(this);
  },

  toSAN: function () {
    return 'R' + Move.prototype.getSanDisambiguation(this) + this.targetSquare.name;
  }
};

module.exports = RookMove;

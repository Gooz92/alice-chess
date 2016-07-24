'use strict';

// KQkq
// 3210

// 0 => 2, 0
// 7 => 3, 1

var Move = require('./move'),
  isDefined = require('../../utils/common-utils/is-type-utils').isDefined;

function RookMove(sourceSquare, targetSquare) {
  Move.call(this, sourceSquare, targetSquare);
}

RookMove.prototype = {
  constructor: RookMove,

  make: function () {
    var chess = this.targetSquare.chess,
      castlingRightsIndex = this.sourceSquare.getFileIndex();

    if (castlingRightsIndex === 7) {
      castlingRightsIndex = 1;
    }

    castlingRightsIndex += 2 * this.sourceSquare.piece.color.index;

    this.previousCastlingRigths = chess.castlingRights;
    chess.castlingRights &= (15 ^ (1 << castlingRightsIndex));

    Move.prototype.make.call(this);
  },

  unMake: function () {
    this.targetSquare.chess.castlingRights = this.previousCastlingRigths;
    Move.prototype.unMake.call(this);
  },

  toSAN: function () {
    return 'R' + this.targetSquare.name;
  }
};

module.exports = RookMove;

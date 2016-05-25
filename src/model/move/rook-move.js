'use strict';

var Move = require('./move'),
  isDefined = require('../../utils/common-utils/is-utils').isDefined;

function RookMove(sourceSquare, targetSquare) {
  Move.call(this, sourceSquare, targetSquare);
}

RookMove.prototype = {
  constructor: RookMove,

  make: function () {
    var chess = this.targetSquare.chess,
      fileIndex = this.sourceSquare.getFileIndex(),
      castlingRightsIndex = 2 * this.piece.color.index;

    if (fileIndex === 0) {
      ++castlingRightsIndex;
    }

    if (chess.castlingAvalibility[castlingRightsIndex]) {
      chess.castlingAvalibility[castlingRightsIndex] = false;
      this.castlingRightsIndex = castlingRightsIndex;
    }

    Move.prototype.make.call(this);
  },

  unMake: function () {
    var chess;

    if (isDefined(this.castlingRightsIndex)) {
      chess = this.targetSquare.chess;
      chess.castlingAvalibility[this.castlingRightsIndex] = true;
    }

    Move.prototype.unMake.call(this);
  },

  toSAN: function () {
    return 'R' + this.targetSquare.name;
  }
};

module.exports = RookMove;

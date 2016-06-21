'use strict';

var arrayUtils = require('../../utils/common-utils/array-utils');

function Move(sourceSquare, targetSquare) {
  this.sourceSquare = sourceSquare;
  this.targetSquare = targetSquare;
  this.piece = sourceSquare.piece;
}

Move.prototype = {
  constructor: Move,

  make: function () {
    var chess = this.targetSquare.chess;

    this.sourceSquare.piece.moveTo(this.targetSquare);

    chess.turn();
    chess.history.push(this);
  },

  unMake: function () {
    var chess = this.targetSquare.chess;

    this.targetSquare.piece.moveTo(this.sourceSquare);

    chess.enPassantTargetSquare = this.previousEnPassantTagetSquare;
    this.targetSquare.chess.turn();
    arrayUtils.remove(this.targetSquare.chess.history, this);
  },

  // TODO
  toSAN: function () {
    if (this.piece.isPawn()) {
      return this.targetSquare.name;
    }

    return this.piece.token.toUpperCase() + this.targetSquare.name;
  }
};

module.exports = Move;
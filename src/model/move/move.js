'use strict';

var arrayUtils = require('../../utils/common-utils/array-utils');

function Move(sourceSquare, targetSquare) {
  this.sourceSquare = sourceSquare;
  this.targetSquare = targetSquare;
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
  getName: function () {
  }
};

module.exports = Move;
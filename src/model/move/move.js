'use strict';

var arrayUtils = require('../../utils/common-utils/array-utils')

function Move(sourceSquare, targetSquare) {
  this.sourceSquare = sourceSquare;
  this.targetSquare = targetSquare;
  this.piece = this.sourceSquare.piece;
};

Move.prototype = {
  constructor: Move,

  make: function () {
    var chess = this.targetSquare.chess;

    this.piece.moveTo(this.targetSquare);

    this.previousEnPassantTagetSquare = chess.enPassantTargetSquare;

    chess.turn();
    chess.history.push(this);
  },

  unMake: function () {
    var chess = this.targetSquare.chess;

    this.piece.moveTo(this.sourceSquare);

    chess.enPassantTargetSquare = this.previousEnPassantTagetSquare;
    this.targetSquare.chess.turn();
    arrayUtils.remove(this.targetSquare.chess.history, this);
  }
};

module.exports = Move;
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

    // remove this shit and update clear e.p. square during move execution
    chess.enPassantTargetSquare = this.previousEnPassantTagetSquare;
    chess.turn();
    arrayUtils.remove(chess.history, this);
  },

  // TODO
  toSAN: function (options) {
    var disambiguation = '';

    options = options || {};

    if (this.piece.isPawn()) {
      return this.targetSquare.name;
    }

    if (options.disambiguateFileIndex) {
      disambiguation += this.sourceSquare.name.charAt(0);
    }

    if (options.disambiguateRankIndex) {
      disambiguation += this.sourceSquare.name.charAt(1);
    }

    return [
      this.piece.token.toUpperCase(),
      disambiguation,
      this.targetSquare.name
    ].join('');
  }
};

module.exports = Move;
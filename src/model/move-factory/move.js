'use strict';

var arrayUtils = require('../../utils/common-utils/array-utils'),
  objectUtils = require('../../utils/common-utils/object-utils');

function Move(sourceSquare, targetSquare) {
  this.sourceSquare = sourceSquare;
  this.targetSquare = targetSquare;
  this.piece = sourceSquare.piece;

  this.disambiguateRank = false;
  this.disambiguateFile = false;
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

  getSanDisambiguation: function () {
    var disambiguation = '';

    if (this.disambiguateFile) {
      disambiguation += this.sourceSquare.fileName;
    }

    if (this.disambiguateRank) {
      disambiguation += this.sourceSquare.rankName;
    }

    return disambiguation;
  },

  // TODO
  toSAN: function () {
    if (this.piece.isPawn()) {
      return this.targetSquare.name;
    }

    return [
      this.piece.token.toUpperCase(),
      this.getSanDisambiguation(),
      this.targetSquare.name
    ].join('');
  }
};

module.exports = Move;